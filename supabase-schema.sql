-- Comments table for archive notes
CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    note_id BIGINT NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    author_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all comments
CREATE POLICY "Allow authenticated users to read comments" ON comments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert comments
CREATE POLICY "Allow authenticated users to insert comments" ON comments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own comments
CREATE POLICY "Allow users to update their own comments" ON comments
    FOR UPDATE USING (auth.email() = author_email);

-- Allow users to delete their own comments
CREATE POLICY "Allow users to delete their own comments" ON comments
    FOR DELETE USING (auth.email() = author_email);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_note_id ON comments(note_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_comments_updated_at 
    BEFORE UPDATE ON comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Also add updated_at to notes table if it doesn't exist
ALTER TABLE notes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

CREATE TRIGGER update_notes_updated_at 
    BEFORE UPDATE ON notes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();