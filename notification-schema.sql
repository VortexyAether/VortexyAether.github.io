-- Notification system for comments
-- This tracks when users last viewed each note to determine "new" comments

CREATE TABLE IF NOT EXISTS user_note_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    last_viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_email, note_id)
);

-- Enable RLS
ALTER TABLE user_note_views ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own view records
CREATE POLICY "Users can manage their own note views" ON user_note_views
    FOR ALL USING (auth.email() = user_email);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_user_note_views_user_email ON user_note_views(user_email);
CREATE INDEX IF NOT EXISTS idx_user_note_views_note_id ON user_note_views(note_id);

-- Function to get comment count for a note
CREATE OR REPLACE FUNCTION get_comment_count(note_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER 
        FROM comments 
        WHERE note_id = note_uuid
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get new comment count for a user and note
CREATE OR REPLACE FUNCTION get_new_comment_count(note_uuid UUID, user_email_param VARCHAR)
RETURNS INTEGER AS $$
DECLARE
    last_viewed TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Get when user last viewed this note
    SELECT last_viewed_at INTO last_viewed
    FROM user_note_views 
    WHERE note_id = note_uuid AND user_email = user_email_param;
    
    -- If never viewed, count all comments
    IF last_viewed IS NULL THEN
        RETURN get_comment_count(note_uuid);
    END IF;
    
    -- Count comments since last view
    RETURN (
        SELECT COUNT(*)::INTEGER 
        FROM comments 
        WHERE note_id = note_uuid 
        AND created_at > last_viewed
    );
END;
$$ LANGUAGE plpgsql;

-- Function to mark note as viewed by user
CREATE OR REPLACE FUNCTION mark_note_viewed(note_uuid UUID, user_email_param VARCHAR)
RETURNS VOID AS $$
BEGIN
    INSERT INTO user_note_views (user_email, note_id, last_viewed_at)
    VALUES (user_email_param, note_uuid, NOW())
    ON CONFLICT (user_email, note_id)
    DO UPDATE SET last_viewed_at = NOW();
END;
$$ LANGUAGE plpgsql;