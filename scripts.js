633796(function () {
  const flexElements = document.querySelectorAll(
    '.ipe-EventViewDetail_BB, .ipe-EventViewDetail_MarketGrid, .ipe-EventViewDetail_MyBetsModuleContainer'
  );

  flexElements.forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
  });

  const textElements = document.querySelectorAll('.sip-MarketGroupButton_Text');
  let target = null;

  for (const el of textElements) {
    if (el.textContent.includes('Ace Totals')) {
      target = el;

      // go 4 levels up
      for (let i = 0; i < 4; i++) {
        if (!target.parentElement) {
          target = null;
          break;
        }
        target = target.parentElement;
      }

      break;
    }
  }

  if (target) {
    target.style.order = '-1';
  }
})(); 