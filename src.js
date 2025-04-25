javascript:(function(){
    const style = document.createElement('style');
    style.textContent = `
        .neon-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 20, 0.85);
            z-index: 999999;
            font-family: 'Arial', sans-serif;
            color: #0ff;
            overflow: auto;
            border: 2px solid #0ff;
            box-shadow: 0 0 10px #0ff, inset 0 0 10px #0ff;
        }
        .neon-header {
            padding: 15px;
            background: rgba(0, 0, 40, 0.7);
            border-bottom: 1px solid #0ff;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .neon-title {
            font-size: 24px;
            text-shadow: 0 0 5px #0ff;
            margin: 0;
        }
        .neon-close {
            background: transparent;
            border: 1px solid #0ff;
            color: #0ff;
            font-size: 18px;
            cursor: pointer;
            padding: 5px 15px;
            box-shadow: 0 0 5px #0ff;
            transition: all 0.3s;
        }
        .neon-close:hover {
            background: rgba(0, 255, 255, 0.2);
            box-shadow: 0 0 15px #0ff;
        }
        .neon-tabs {
            display: flex;
            border-bottom: 1px solid #0ff;
            padding-left: 15px;
        }
        .neon-tab {
            padding: 10px 20px;
            cursor: pointer;
            border: 1px solid transparent;
            border-bottom: none;
            margin-right: 5px;
            transition: all 0.3s;
        }
        .neon-tab.active {
            background: rgba(0, 0, 40, 0.7);
            border-color: #0ff;
            border-radius: 5px 5px 0 0;
            text-shadow: 0 0 5px #0ff;
        }
        .neon-tab:hover:not(.active) {
            background: rgba(0, 0, 40, 0.4);
        }
        .neon-content {
            padding: 20px;
        }
        .neon-tab-content {
            display: none;
        }
        .neon-tab-content.active {
            display: block;
        }
        .neon-input {
            background: rgba(0, 0, 40, 0.7);
            border: 1px solid #0ff;
            color: #0ff;
            padding: 8px;
            margin: 5px 0;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 0 5px #0ff;
        }
        .neon-button {
            background: transparent;
            border: 1px solid #0ff;
            color: #0ff;
            padding: 8px 15px;
            margin: 5px 0;
            cursor: pointer;
            box-shadow: 0 0 5px #0ff;
            transition: all 0.3s;
        }
        .neon-button:hover {
            background: rgba(0, 255, 255, 0.2);
            box-shadow: 0 0 15px #0ff;
        }
        .neon-iframe {
            width: 100%;
            height: 400px;
            border: 1px solid #0ff;
            background: white;
            margin-top: 10px;
        }
        .neon-list {
            list-style: none;
            padding: 0;
        }
        .neon-list-item {
            padding: 10px;
            margin: 5px 0;
            background: rgba(0, 0, 40, 0.5);
            border: 1px solid #0ff;
            display: flex;
            justify-content: space-between;
        }
        .neon-list-item button {
            background: transparent;
            border: 1px solid #f0f;
            color: #f0f;
            cursor: pointer;
            margin-left: 5px;
        }
        .neon-list-item button:hover {
            background: rgba(255, 0, 255, 0.2);
        }
        .neon-clock {
            font-size: 18px;
            text-align: center;
            margin: 10px 0;
            text-shadow: 0 0 5px #0ff;
        }
        .neon-note {
            width: 100%;
            height: 200px;
            background: rgba(0, 0, 40, 0.7);
            border: 1px solid #0ff;
            color: #0ff;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            box-shadow: 0 0 5px #0ff;
        }
        .neon-tool-config {
            margin-top: 20px;
        }
        .neon-tool-code {
            width: 100%;
            height: 150px;
            background: rgba(0, 0, 40, 0.7);
            border: 1px solid #0ff;
            color: #0ff;
            font-family: monospace;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'neon-overlay';

    overlay.innerHTML = `
        <div class="neon-header">
            <h1 class="neon-title">Neon Tools</h1>
            <button class="neon-close">X</button>
        </div>
        <div class="neon-tabs">
            <div class="neon-tab active" data-tab="page-viewer">Page Viewer</div>
            <div class="neon-tab" data-tab="clock">Clock</div>
            <div class="neon-tab" data-tab="notes">Notes</div>
            <div class="neon-tab" data-tab="bookmarks">Bookmarks</div>
            <div class="neon-tab" data-tab="custom-tools">Custom Tools</div>
        </div>
        <div class="neon-content">
            <div class="neon-tab-content active" id="page-viewer">
                <input type="text" class="neon-input" id="page-url" placeholder="Enter URL (e.g., https://example.com)">
                <button class="neon-button" id="load-page">Load Page</button>
                <div class="neon-iframe-container">
                    <iframe class="neon-iframe" id="page-iframe"></iframe>
                </div>
            </div>
            <div class="neon-tab-content" id="clock">
                <div class="neon-clock" id="current-time"></div>
                <div class="neon-clock" id="current-date"></div>
            </div>
            <div class="neon-tab-content" id="notes">
                <textarea class="neon-note" id="note-text" placeholder="Write your notes here..."></textarea>
                <button class="neon-button" id="save-note">Save Note</button>
                <button class="neon-button" id="clear-note">Clear Note</button>
            </div>
            <div class="neon-tab-content" id="bookmarks">
                <input type="text" class="neon-input" id="bookmark-name" placeholder="Bookmark name">
                <input type="text" class="neon-input" id="bookmark-url" placeholder="Bookmark URL">
                <button class="neon-button" id="add-bookmark">Add Bookmark</button>
                <ul class="neon-list" id="bookmarks-list"></ul>
            </div>
            <div class="neon-tab-content" id="custom-tools">
                <h3>Create Custom Tool</h3>
                <input type="text" class="neon-input" id="tool-name" placeholder="Tool name">
                <select class="neon-input" id="tool-language">
                    <option value="javascript">JavaScript</option>
                    <option value="custom">Custom Language</option>
                </select>
                <div class="neon-tool-config" id="javascript-config">
                    <textarea class="neon-tool-code" id="tool-code" placeholder="Enter your JavaScript code here"></textarea>
                    <button class="neon-button" id="save-tool">Save Tool</button>
                </div>
                <div class="neon-tool-config" id="custom-config" style="display:none;">
                    <p>Custom language tools coming soon!</p>
                </div>
                <h3>Your Tools</h3>
                <ul class="neon-list" id="tools-list"></ul>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const tabs = overlay.querySelectorAll('.neon-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabContents = overlay.querySelectorAll('.neon-tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            const targetTab = overlay.querySelector(`#${tab.dataset.tab}`);
            targetTab.classList.add('active');
        });
    });

    overlay.querySelector('.neon-close').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    overlay.querySelector('#load-page').addEventListener('click', () => {
        const url = overlay.querySelector('#page-url').value;
        if (url) {
            let finalUrl = url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                finalUrl = 'https://' + url;
            }
            overlay.querySelector('#page-iframe').src = finalUrl;
        }
    });

    function updateClock() {
        const now = new Date();
        overlay.querySelector('#current-time').textContent = now.toLocaleTimeString();
        overlay.querySelector('#current-date').textContent = now.toLocaleDateString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    const noteText = overlay.querySelector('#note-text');
    overlay.querySelector('#save-note').addEventListener('click', () => {
        localStorage.setItem('neonOverlayNote', noteText.value);
        alert('Note saved!');
    });
    overlay.querySelector('#clear-note').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the note?')) {
            noteText.value = '';
            localStorage.removeItem('neonOverlayNote');
        }
    });
    const savedNote = localStorage.getItem('neonOverlayNote');
    if (savedNote) {
        noteText.value = savedNote;
    }

    function loadBookmarks() {
        const bookmarksList = overlay.querySelector('#bookmarks-list');
        bookmarksList.innerHTML = '';
        const bookmarks = JSON.parse(localStorage.getItem('neonOverlayBookmarks') || '[]');
        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement('li');
            li.className = 'neon-list-item';
            li.innerHTML = `
                <a href="${bookmark.url}" target="_blank" style="color:#0ff;text-decoration:none;">${bookmark.name}</a>
                <div>
                    <button class="delete-bookmark" data-index="${index}">Delete</button>
                </div>
            `;
            bookmarksList.appendChild(li);
        });
        
        // Add delete event listeners
        overlay.querySelectorAll('.delete-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const bookmarks = JSON.parse(localStorage.getItem('neonOverlayBookmarks') || '[]');
                bookmarks.splice(index, 1);
                localStorage.setItem('neonOverlayBookmarks', JSON.stringify(bookmarks));
                loadBookmarks();
            });
        });
    }
    
    overlay.querySelector('#add-bookmark').addEventListener('click', () => {
        const name = overlay.querySelector('#bookmark-name').value;
        const url = overlay.querySelector('#bookmark-url').value;
        
        if (name && url) {
            let finalUrl = url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                finalUrl = 'https://' + url;
            }
            
            const bookmarks = JSON.parse(localStorage.getItem('neonOverlayBookmarks') || '[]');
            bookmarks.push({ name, url: finalUrl });
            localStorage.setItem('neonOverlayBookmarks', JSON.stringify(bookmarks));
            
            overlay.querySelector('#bookmark-name').value = '';
            overlay.querySelector('#bookmark-url').value = '';
            loadBookmarks();
        } else {
            alert('Please enter both a name and URL for the bookmark.');
        }
    });
    
    loadBookmarks();

    overlay.querySelector('#tool-language').addEventListener('change', (e) => {
        if (e.target.value === 'javascript') {
            overlay.querySelector('#javascript-config').style.display = 'block';
            overlay.querySelector('#custom-config').style.display = 'none';
        } else {
            overlay.querySelector('#javascript-config').style.display = 'none';
            overlay.querySelector('#custom-config').style.display = 'block';
        }
    });

    function loadTools() {
        const toolsList = overlay.querySelector('#tools-list');
        toolsList.innerHTML = '';
        const tools = JSON.parse(localStorage.getItem('neonOverlayTools') || '[]');
        tools.forEach((tool, index) => {
            const li = document.createElement('li');
            li.className = 'neon-list-item';
            li.innerHTML = `
                <span>${tool.name}</span>
                <div>
                    <button class="run-tool" data-index="${index}">Run</button>
                    <button class="delete-tool" data-index="${index}">Delete</button>
                </div>
            `;
            toolsList.appendChild(li);
        });
        
        overlay.querySelectorAll('.run-tool').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const tools = JSON.parse(localStorage.getItem('neonOverlayTools') || '[]');
                try {
                    const func = new Function(tools[index].code);
                    func();
                } catch (err) {
                    alert('Error running tool: ' + err.message);
                }
            });
        });
        
        overlay.querySelectorAll('.delete-tool').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const tools = JSON.parse(localStorage.getItem('neonOverlayTools') || '[]');
                tools.splice(index, 1);
                localStorage.setItem('neonOverlayTools', JSON.stringify(tools));
                loadTools();
            });
        });
    }
    
    overlay.querySelector('#save-tool').addEventListener('click', () => {
        const name = overlay.querySelector('#tool-name').value;
        const code = overlay.querySelector('#tool-code').value;
        
        if (name && code) {
            const tools = JSON.parse(localStorage.getItem('neonOverlayTools') || '[]');
            tools.push({ name, code });
            localStorage.setItem('neonOverlayTools', JSON.stringify(tools));
            
            overlay.querySelector('#tool-name').value = '';
            overlay.querySelector('#tool-code').value = '';
            loadTools();
        } else {
            alert('Please enter both a name and code for the tool.');
        }
    });
    
    loadTools();
})();