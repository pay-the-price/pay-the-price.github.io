const userInput = document.getElementById('user-input');
const outputDiv = document.getElementById('output');
const promptDiv = document.getElementById('prompt');
const terminal = document.getElementById('terminal');

// 页面加载后自动聚焦
window.addEventListener('load', () => {
    userInput.focus();
});

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // 阻止默认的换行行为（对于input来说是提交表单）

        // 获取当前输入框的内容
        const command = userInput.value;

        // 将当前命令添加到输出历史中
        // 使用 <pre> 标签或 \n 字符来保留格式和换行
        const commandElement = document.createElement('div');
        commandElement.textContent = '/' + command; // 添加提示符前缀
        commandElement.style.whiteSpace = 'pre-wrap'; // 确保换行符被渲染
        outputDiv.appendChild(commandElement);

        // 滚动到底部以显示最新内容
        terminal.scrollTop = terminal.scrollHeight;

        // 清空输入框，准备下一次输入
        userInput.value = '';

        // 重新聚焦到输入框
        userInput.focus();
    }
});

// --- 故障效果控制 ---
function getRandomOffset(maxOffset) {
    return (Math.random() - 0.5) * 2 * maxOffset;
}

function applyTerminalGlitch() {
    const maxOffset = 15;
    const x = getRandomOffset(maxOffset);
    const y = getRandomOffset(maxOffset);
    terminal.style.transform = `translate(${x}px, ${y}px)`;
    setTimeout(() => {
        terminal.style.transform = 'translate(0, 0)';
    }, 50);
}

function applySevereGlitch() {
    const maxOffset = 25;
    const x = getRandomOffset(maxOffset);
    const y = getRandomOffset(maxOffset);
    const styleId = 'dynamic-glitch-style';
    let styleElement = document.getElementById(styleId);
    if (!styleId) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }
    styleElement.textContent = `
        body.glitch-active::before {
            transform: translate(${x}px, ${y}px) !important;
        }
    `;
    document.body.classList.add('glitch-active');
    setTimeout(() => {
        document.body.classList.remove('glitch-active');
        if (styleElement) {
            styleElement.textContent = '';
        }
    }, 60);
}

setInterval(() => {
    if (Math.random() > 0.3) {
        applyTerminalGlitch();
    }
    if (Math.random() > 0.5) {
        applySevereGlitch();
    }
}, 1500);

let flickerInterval;
function startFlicker() {
    if (flickerInterval) clearInterval(flickerInterval);
    flickerInterval = setInterval(() => {
        const opacity = 0.7 + Math.random() * 0.3;
        document.body.style.opacity = opacity;
        const flickerDuration = 50 + Math.random() * 100;
        setTimeout(() => {
            document.body.style.opacity = '';
        }, flickerDuration);
    }, 300 + Math.random() * 400);
}

startFlicker();
