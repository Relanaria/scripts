document.getElementById('runBtn').addEventListener('click', async () => {
  const input = document.getElementById('keywords').value;

  // convert to array
  const keywords = input
    .split(',')
    .map(k => k.trim())
    .filter(Boolean);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (keywords) => {
      // your function goes here 👇

      const parents = document.querySelectorAll(
        '.ipe-EventViewDetail_BB, .ipe-EventViewDetail_MarketGrid, .ipe-EventViewDetail_MyBetsModuleContainer'
      );

      const normalize = str =>
        str.replace(/\s+/g, ' ').trim().toLowerCase();

      parents.forEach(parent => {
        parent.style.display = 'flex';
        parent.style.flexDirection = 'column';

        const textElements = parent.querySelectorAll('.sip-MarketGroupButton_Text');
        const matched = [];

        textElements.forEach(el => {
          const text = normalize(el.textContent);

          if (keywords.some(k => normalize(k) === text)) {
            let target = el;
            console.log(el);
            

            for (let i = 0; i < 4; i++) {
              if (!target.parentElement) return;
              target = target.parentElement;
            }
            console.log(target);
            matched.push(target);
          }
        });

        matched.forEach((el, index) => {
          console.log(index);
          
          el.style.order = -(index + 2);
        });
      });

    },
    args: [keywords]
  });
});