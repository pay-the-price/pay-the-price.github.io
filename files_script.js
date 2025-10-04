document.addEventListener('DOMContentLoaded', function() {
    const fileList = document.getElementById('file-list');
    const contentTitle = document.getElementById('content-title');
    const contentBody = document.getElementById('content-body');
    const container = document.getElementById('container');

    // 生成随机字符串的辅助函数
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~`';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // 档案数据 (使用随机字符串)
    const fileData = {
        '档案一': {
            title: generateRandomString(30),
            content: generateRandomString(200)
        },
        '档案二': {
            title: generateRandomString(25),
            content: generateRandomString(180)
        },
        '档案三': {
            title: 'TRYTOCUNNECT'
            content: `We are so short of manpower now that we can't fight against them. We posted a video on the social platform. I don't know if they can find it and connect... I hope so.`
        }
    };

    // 为每个列表项添加点击事件
    fileList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function() {
            const fileName = this.getAttribute('data-file');
            
            fileList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');

            updateContent(fileName);
        });
    });

    // 更新右侧内容区的函数
    function updateContent(fileName) {
        const data = fileData[fileName];
        if (data) {
            contentTitle.textContent = data.title;
            contentBody.textContent = data.content;

            contentBody.style.opacity = '0';
            contentBody.style.transform = 'translateY(10px)';
            
            contentBody.offsetHeight; 

            contentBody.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            contentBody.style.opacity = '1';
            contentBody.style.transform = 'translateY(0)';
        } else {
            contentTitle.textContent = '错误';
            contentBody.textContent = '未找到指定档案的内容。';
        }
    }

    // 页面加载完成后，触发动画
    setTimeout(() => {
        container.style.animation = 'container-pop 0.3s ease-out forwards';
    }, 50);

    // --- 修复后的故障效果控制 ---
    function getRandomOffset(maxOffset) {
        return (Math.random() - 0.5) * 2 * maxOffset;
    }

    function applyTerminalGlitch() {
        const maxOffset = 10;
        const x = getRandomOffset(maxOffset);
        const y = getRandomOffset(maxOffset);
        // 直接修改 container 的 transform
        container.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => {
            container.style.transform = 'translate(0, 0)';
        }, 40);
    }

    function applySevereGlitch() {
        const maxOffset = 15;
        const x = getRandomOffset(maxOffset);
        const y = getRandomOffset(maxOffset);
        
        // 创建或获取动态样式元素
        let styleElement = document.getElementById('dynamic-glitch-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-glitch-style';
            document.head.appendChild(styleElement);
        }

        // 设置动态样式
        styleElement.textContent = `
            body.glitch-active::before {
                transform: translate(${x}px, ${y}px) !important;
            }
        `;

        // 添加类以触发动画
        document.body.classList.add('glitch-active');

        // 移除类和样式
        setTimeout(() => {
            document.body.classList.remove('glitch-active');
            // 清空样式，为下次瞬移做准备
            styleElement.textContent = '';
        }, 50);
    }

    // 定时触发瞬移效果
    setInterval(() => {
        if (Math.random() > 0.4) {
            applyTerminalGlitch();
        }
        if (Math.random() > 0.6) {
            applySevereGlitch();
        }
    }, 2000);

    // 注意：移除了 flicker 相关的代码

});



