(function () {
    let container, pre, copyBtn;

    function initConsole() {
        if (container) return;

        // Main container
        container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.paddingTop = "var(--statusBar-height)";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.background = "#151822"; // soft black
        container.style.color = "#e6e6e6";       // soft white
        container.style.zIndex = "999999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.fontFamily = "monospace";

        // Top bar
        const topBar = document.createElement("div");
        topBar.style.display = "flex";
        topBar.style.justifyContent = "space-between";
        topBar.style.alignItems = "center";
        topBar.style.padding = "8px 12px";
        topBar.style.background = "#151822";
        topBar.style.borderBottom = "1px solid #2a2f3a";

        const title = document.createElement("span");
        title.innerText = "Console";
        title.style.fontSize = "14px";
        title.style.opacity = "0.85";

        // Copy button
        copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy All";
        copyBtn.style.background = "#3b82f6";
        copyBtn.style.border = "none";
        copyBtn.style.color = "#ffffff";
        copyBtn.style.padding = "6px 10px";
        copyBtn.style.borderRadius = "6px";
        copyBtn.style.cursor = "pointer";
        copyBtn.style.fontSize = "12px";

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(pre.innerText);
            copyBtn.innerText = "Copied!";
            setTimeout(() => (copyBtn.innerText = "Copy All"), 1200);
        };

        topBar.appendChild(title);
        topBar.appendChild(copyBtn);

        // Console output
        pre = document.createElement("pre");
        pre.style.flex = "1";
        pre.style.margin = "0";
        pre.style.padding = "12px";
        pre.style.overflow = "auto";
        pre.style.whiteSpace = "pre-wrap";
        pre.style.userSelect = "text";
        pre.style.color = "#e6e6e6";
        pre.style.background = "#0f1115";
        pre.style.paddingBottom = "var(--navBar-height)";

        container.appendChild(topBar);
        container.appendChild(pre);
        document.body.appendChild(container);
    }

    // Global console log
    window.consoleLog = function (data, type = "log") {
        initConsole();

        let output;
        try {
            output =
                typeof data === "object"
                    ? JSON.stringify(data, null, 2)
                    : String(data);
        } catch {
            output = String(data);
        }

        const time = new Date().toLocaleTimeString();
        pre.innerText += `${output}\n\n`;
        
    };
})();
