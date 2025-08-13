// Supabase 클라이언트 설정
const SUPABASE_URL = 'https://kbciqteoeanrssxclwtt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiY2lxdGVvZWFucnNzeGNsd3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzc1MDMsImV4cCI6MjA3MDY1MzUwM30.URgrlom7TXpdpI7bpzOhgUl-4s02Pq-FVPpL28NaB6U';

// Supabase 클라이언트 초기화 (CDN에서 로드된 supabase 사용)
let supabase;

// 페이지 로드 시 Supabase 클라이언트 초기화
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase 클라이언트 초기화 완료');
    } else {
        console.error('Supabase 라이브러리를 로드하지 못했습니다.');
    }
});

class SupabaseArchiveManager {
    constructor() {
        this.currentUser = null;
    }

    // 현재 사용자 가져오기
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        this.currentUser = user;
        return user;
    }

    // 이메일/비밀번호로 회원가입
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (error) throw error;
        return data;
    }

    // 이메일/비밀번호로 로그인
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;
        this.currentUser = data.user;
        return data;
    }

    // 로그아웃
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.currentUser = null;
    }

    // 노트 생성
    async createNote(title, content, author = 'Anonymous') {
        const user = await this.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        const { data, error } = await supabase
            .from('notes')
            .insert([
                {
                    title,
                    content,
                    author,
                    user_id: user.id
                }
            ])
            .select();

        if (error) throw error;
        return data[0];
    }

    // 노트 목록 가져오기
    async getNotes() {
        const user = await this.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    // 노트 삭제
    async deleteNote(id) {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }

    // 파일 업로드
    async uploadFile(file) {
        const user = await this.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        // 파일 크기 체크 (50MB 제한)
        if (file.size > 50 * 1024 * 1024) {
            throw new Error('파일 크기는 50MB를 초과할 수 없습니다.');
        }

        // 파일 경로: user_id/timestamp_filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${user.id}/${fileName}`;

        const { data, error } = await supabase.storage
            .from('archive-files')
            .upload(filePath, file);

        if (error) throw error;

        // 파일 정보 반환
        return {
            id: Date.now(),
            name: file.name,
            size: file.size,
            type: file.type,
            path: filePath,
            uploadDate: new Date().toISOString()
        };
    }

    // 파일 목록 가져오기
    async getFiles() {
        const user = await this.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        const { data, error } = await supabase.storage
            .from('archive-files')
            .list(user.id, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' }
            });

        if (error) throw error;

        // 파일 정보 변환
        return data.map(file => ({
            id: file.id,
            name: file.name.replace(/^\d+_/, ''), // timestamp 제거
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || '',
            path: `${user.id}/${file.name}`,
            uploadDate: file.created_at
        }));
    }

    // 파일 다운로드 URL 생성
    async getDownloadUrl(filePath) {
        const { data, error } = await supabase.storage
            .from('archive-files')
            .createSignedUrl(filePath, 3600); // 1시간 유효

        if (error) throw error;
        return data.signedUrl;
    }

    // 파일 삭제
    async deleteFile(filePath) {
        const { error } = await supabase.storage
            .from('archive-files')
            .remove([filePath]);

        if (error) throw error;
    }

    // 실시간 노트 구독 (옵션)
    subscribeToNotes(callback) {
        const user = this.currentUser;
        if (!user) return;

        return supabase
            .channel('notes-changes')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'notes',
                filter: `user_id=eq.${user.id}`
            }, callback)
            .subscribe();
    }

    // 인증 상태 변경 리스너
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((event, session) => {
            this.currentUser = session?.user || null;
            callback(event, session);
        });
    }
}