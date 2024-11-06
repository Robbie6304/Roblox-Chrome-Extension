(function() {
  'use strict';

  const toggles = document.querySelectorAll('input[type="checkbox"]');
  
  chrome.storage.sync.get(['toggle1', 'toggle2', 'toggle3', 'toggle4', 'toggle5', 'toggle6', 'toggle7', 'toggle8'], function(result) {
    toggles.forEach(toggle => {
      toggle.checked = result[toggle.id] || false;
    });
    
    if (result.toggle1) {
      TurnOnToggle1();
    }

    if (result.toggle2) {
      TurnOnToggle2();
    }

    if (result.toggle3) {
      TurnOnToggle3();
    }

    if (result.toggle4) {
      TurnOnToggle4();
    }

    if (result.toggle5) {
      TurnOnToggle5();
    }

    if (result.toggle6) {
      TurnOnToggle6();
    }

    if (result.toggle7) {
      TurnOnToggle7();
    }

    if (result.toggle8) {
      TurnOnToggle8();
    }
  });

  toggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      const toggleState = {};
      toggleState[toggle.id] = toggle.checked;
      chrome.storage.sync.set(toggleState, function() {
        console.log(toggle.id + ' state is set to ' + toggle.checked);
      });

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs[0].url);
        if (tabs[0].url.includes('roblox.com')) {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
          });
        }
      });
    });
  });
})();

function TurnOnToggle2() { 
  function renameLink() {
    const link = document.querySelector('a.font-header-2.nav-menu-title.text-header.charts-rename-exp-treatment[href="/charts"]');
    if (link) {
      link.textContent = 'Discover';
    }

    var headerElement = document.querySelector(".games-list-header h1");

    if (headerElement) {
      headerElement.textContent = "Discover";
    }
  }

  const observer = new MutationObserver(renameLink);

  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('load', renameLink);
}

function TurnOnToggle3() { 
  Array.from(document.getElementsByClassName("builder-font")).forEach((v) => {
    v.classList.replace("builder-font", "gotham-font");
  })
}

function TurnOnToggle1() { 
  let Count = 0;
  let Total = 0;
  let GameCounts = {};
  let Universes = [];
  let RequestedUniverses = new Set();
  
  function abbreviateNumber(number) {
      if (number < 1000) {
          return number.toString();
      } else if (number < 1000000) {
          return (number / 1000).toFixed(1) + 'K';
      } else {
          return (number / 1000000).toFixed(1) + 'M';
      }
  }
  
  function Delay2() {
      if (Count != Total) {
          setTimeout(Delay2, 100);
      } else {
          const batchSize = 5;
          const delayBetweenBatches = 100;
  
          for (let i = 0; i < Universes.length; i += batchSize) {
              const chunk = Universes.slice(i, i + batchSize);
              const filteredChunk = chunk.filter(id => !RequestedUniverses.has(id))
  
              if (filteredChunk.length === 0) {
                  continue;
              }
  
              let xhr = new XMLHttpRequest();
              let params = JSON.stringify(filteredChunk).replace('[', "").replace("]", "").replaceAll('"', '').replaceAll("'", "");
              xhr.open("GET", "https://games.roblox.com/v1/games?universeIds=" + params);
              xhr.send();
  
              filteredChunk.forEach(id => RequestedUniverses.add(id));
  
              function check1() {
                  if (xhr.readyState !== 4) {
                      window.setTimeout(check1, delayBetweenBatches);
                  } else if (xhr.status === 200) {
                      let loaded = JSON.parse(xhr.response);
                      for (let info of loaded.data) {
                          GameCounts[info.id] = info.playing;
                      }
                  } else {
                      console.error('Request failed with status: ' + xhr.status);
                  }
              }
              check1();
          }
      }
  }
  
  function AddPlayerCounts(games) {
      Total = games.length;
      setTimeout(Delay2, 5);
      for (let game of games) {
          
          let card = game.getElementsByClassName("base-metadata")[0].getElementsByClassName("game-card-info")[0];

          if (!card.innerHTML.includes('<span class="info-label icon-playing-counts-gray"></span>')) {
              if (!card.querySelector('span.thumbnail-2d-container.shimmer.avatar.avatar-headshot.avatar-headshot-xs')) {
                card.innerHTML = card.innerHTML + '<span class="info-label icon-playing-counts-gray"></span>';
                let Universe = game.getAttribute('id');
                Universes.push(Universe);
                Count += 1;
        
                function GetInfo() {
                  if (!(Universe in GameCounts)) {
                    window.setTimeout(GetInfo, 100);
                  } else {
                    let playing = abbreviateNumber(GameCounts[Universe]);
                    card.innerHTML = card.innerHTML + '<span class="info-label playing-counts-label">' + playing + '</span></div>';
                  }
                }
                GetInfo();
              }
          }
      }
  }
  
  function Delay() {
      let games = document.querySelectorAll('li.list-item[data-testid="wide-game-tile"]');
  
      if (games.length == 0) {
          setTimeout(Delay, 250);
      } else {
          AddPlayerCounts(games);
      }
  }
  
  function startDelay() {
      setInterval(Delay, 250);
  }

  setTimeout(startDelay, 1000);
}

function TurnOnToggle4() {
  const checkPriceTag = setInterval(() => {
    const priceTag = document.querySelector('.price-tag.navbar-compact.nav-credit-text');
    if (priceTag !== null) {
      clearInterval(checkPriceTag);

      const priceText = priceTag.textContent.trim();
      const priceValue = parseFloat(priceText.replace('$', ''));
    
      if (priceValue < 1.00) {
        const navRobuxIcon = document.querySelector('.nav-robux-icon.rbx-menu-item.nav-credit');
    
        if (navRobuxIcon) {
          navRobuxIcon.remove();
        }
      } else {
        console.log('The price is not over $1.00');
      }
    }
  }, 250);
};

function TurnOnToggle5() {
  const element = document.getElementById("upgrade-now-button");
  
  if (element) { 
    document.getElementById("btr-blogfeed").remove();
  }
};

function TurnOnToggle6() {
  const intervalId = setInterval(() => {
      const element = document.getElementById("upgrade-now-button");
      
      if (element) {
          element.remove();
          
          clearInterval(intervalId);
      }
  }, 10);
};

function TurnOnToggle7() {
  const intervalId = setInterval(() => {
    const metaTag = document.querySelector('meta[name="user-data"]');
    
    if (metaTag) {
      clearInterval(intervalId);

      const userId = metaTag.getAttribute('data-userid');
      
      if (window.location.href.includes("/badges/")) {
        const badgeId = window.location.href.match(/\/badges\/(\d+)\//)[1];
        
        const apiUrl = `https://badges.roblox.com/v1/users/${userId}/badges/awarded-dates?badgeIds=${badgeId}`;
        
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            console.log("Badge Awarded Data:", data);
            
            const awardedDate = data.data && data.data.length > 0
              ? new Date(data.data[0].awardedDate).toLocaleDateString()
              : "N/A";
            
            const newContent = document.createElement('div');
            newContent.classList.add('clearfix', 'item-field-container');
            newContent.innerHTML = `
              <div class="font-header-1 text-label text-overflow field-label">Unlocked</div>
              <span class="field-content btr-sales">${awardedDate}</span>
            `;
            
            const itemDetailsDiv = document.getElementById('item-details');
            if (itemDetailsDiv) {
              itemDetailsDiv.appendChild(newContent);
            } else {
              console.warn("Element with id 'item-details' not found.");
            }
          })
          .catch(error => console.error("Error fetching badge data:", error));
      } else {
        console.log("Not on a badge page.");
      }
    }
  }, 100);
}

function TurnOnToggle8() {
  setInterval(() => {
    const elements = document.querySelectorAll('.font-header-2.badge-stats-info');

      elements.forEach(element => {
          const num = element.textContent;
          if (!num.includes(',') && !num.includes('%')) {
              element.textContent = Number(num).toLocaleString();
          }
      });
  }, 500);
};