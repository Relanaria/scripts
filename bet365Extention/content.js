(function (keywords = []) {
  // 1. Make parent containers flex column
  const parents = document.querySelectorAll(
    '.ipe-EventViewDetail_BB, .ipe-EventViewDetail_MarketGrid, .ipe-EventViewDetail_MyBetsModuleContainer'
  );

  parents.forEach(parent => {
    parent.style.display = 'flex';
    parent.style.flexDirection = 'column';

    // 2. Find all text elements inside this parent
    const textElements = parent.querySelectorAll('.sip-MarketGroupButton_Text');

    const matched = [];

    // 3. Match against keywords
    textElements.forEach(el => {
      const text = el.textContent.toLowerCase();

      if (keywords.some(k => text === k.trim().toLowerCase())) {
        let target = el;

        // go up to .gl-MarketGroupPod (4 levels in your structure)
        for (let i = 0; i < 4; i++) {
          if (!target.parentElement) return;
          target = target.parentElement;
        }

        matched.push(target);
      }
    });

    // 4. Apply ordering (bring matched items to top)
    matched.forEach((el, index) => {
      el.style.order = -(index + 2); // -2, -3...
    });
  });

})([
  "Ace Totals",
]); 
