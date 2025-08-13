// GitHub Gist를 사용한 Archive 데이터 저장
// 이 방법은 GitHub Personal Access Token이 필요합니다

class ArchiveGistStorage {
    constructor() {
        // GitHub Personal Access Token (gist 권한 필요)
        // 보안을 위해 환경변수나 별도 설정에서 가져오는 것을 권장
        this.token = localStorage.getItem('githubToken') || '';
        this.gistId = localStorage.getItem('archiveGistId') || '';
        this.apiUrl = 'https://api.github.com/gists';
    }

    // Token 설정
    setToken(token) {
        this.token = token;
        localStorage.setItem('githubToken', token);
    }

    // Gist 생성 또는 업데이트
    async saveData(files, posts) {
        if (!this.token) {
            throw new Error('GitHub token not set');
        }

        const data = {
            files: {
                'archive-data.json': {
                    content: JSON.stringify({
                        files: files,
                        posts: posts,
                        lastUpdated: new Date().toISOString()
                    }, null, 2)
                }
            }
        };

        try {
            let response;
            if (this.gistId) {
                // 기존 Gist 업데이트
                response = await fetch(`${this.apiUrl}/${this.gistId}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } else {
                // 새 Gist 생성
                data.description = 'Archive Data Storage';
                data.public = false; // Private gist
                
                response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const gist = await response.json();
                    this.gistId = gist.id;
                    localStorage.setItem('archiveGistId', this.gistId);
                }
            }

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving to Gist:', error);
            throw error;
        }
    }

    // Gist에서 데이터 로드
    async loadData() {
        if (!this.gistId) {
            return { files: [], posts: [] };
        }

        try {
            const response = await fetch(`${this.apiUrl}/${this.gistId}`, {
                headers: this.token ? {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                } : {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const gist = await response.json();
            const content = gist.files['archive-data.json'].content;
            return JSON.parse(content);
        } catch (error) {
            console.error('Error loading from Gist:', error);
            return { files: [], posts: [] };
        }
    }

    // 파일을 Base64로 인코딩하여 저장
    async uploadFileToGist(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = e.target.result.split(',')[1];
                const fileData = {
                    id: Date.now(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: base64, // Base64 encoded file data
                    uploadDate: new Date().toISOString()
                };
                resolve(fileData);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Base64 파일 다운로드
    downloadFile(fileData) {
        const byteCharacters = atob(fileData.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileData.type });
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}