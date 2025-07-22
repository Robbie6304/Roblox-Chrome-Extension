(function() {
  'use strict';

  const toggles = document.querySelectorAll('input[type="checkbox"]');

  chrome.storage.sync.get(
    [
      'toggle1', 'toggle2', 'toggle3', 'toggle4',
      'toggle5', 'toggle6', 'toggle7', 'toggle8', 
      'toggle9', 'toggle10'
    ],
    function (result) {
      toggles.forEach(toggle => {
        toggle.checked = result[toggle.id] || false;
      });

      Object.keys(result).forEach(key => {
        if (result[key]) {
          const functionName = `TurnOn${key.charAt(0).toUpperCase() + key.slice(1)}`;
          if (typeof window[functionName] === 'function') {
            window[functionName]();
          }
        }
      });
    }
  );

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
  const renameBuzzwords = () => {
    document.querySelectorAll("h2").forEach(h2 => {
      if (h2.textContent.includes("Connections")) {
        const textNode = Array.from(h2.childNodes).find(
          node => node.nodeType === Node.TEXT_NODE && node.textContent.includes("Connections")
        );
        if (textNode) {
          textNode.textContent = textNode.textContent.replace("Connections", "Friends");
        }
      }
    });

    document.querySelectorAll("div.container-header h1.friends-title").forEach(h1 => {
      if (h1.textContent.includes("My Connections")) {
        h1.textContent = h1.textContent.replace("My Connections", "My Friends");
      }
    });

    document.querySelectorAll("span.text-lead").forEach(span => {
      if (span.textContent.trim() === "Connections") {
        span.textContent = "Friends";
      }
    });

    document.querySelectorAll(".profile-header-social-count-label").forEach(span => {
      if (span.textContent.trim() === "Connections") {
        span.textContent = "Friends";
      }
    });

    document.querySelectorAll("input.friends-filter-searchbar-input").forEach(input => {
      if (input.placeholder === "Search Connections") {
        input.placeholder = "Search Friends";
      }
    });

    if (document.title.includes("Connections")) {
      document.title = document.title.replace("Connections", "Friends");
    }

    document.querySelectorAll("span.web-blox-css-tss-1283320-Button-textContainer").forEach(span => {
      const text = span.textContent.trim();
      if (text === "Remove Connection") {
        span.textContent = "Unfriend";
      } else if (text === "Add Connection") {
        span.textContent = "Add Friend";
      }
    });

    document.querySelectorAll("span.font-header-2.dynamic-ellipsis-item").forEach(span => {
      if (span.textContent.trim() === "Connect") {
        span.textContent = "Friends";
      }
      if (span.getAttribute("title") === "Connect") {
        span.setAttribute("title", "Friends");
      }
    });

    // ------- code below handles renaming whatever the hell Chart is -> Discover

    document.querySelectorAll("a.btr-nav-node-header_charts_rename").forEach(a => {
      if (a.textContent.trim() === "Charts") {
        a.textContent = "Discover";
      }
    });

    document.querySelectorAll("div.games-list-header h1").forEach(h1 => {
    if (h1.textContent.trim() === "Charts") {
      h1.textContent = "Discover";
    }
  });

  document.querySelectorAll("a.font-header-2.nav-menu-title.text-header").forEach(a => {
    if (a.textContent.trim() === "Charts") {
      a.textContent = "Discover";
    }
  });


  // ------- code below handles renaming Communities -> Groups

  document.querySelectorAll("h1.groups-list-heading").forEach(h1 => {
    if (h1.textContent.trim() === "Communities") {
      h1.textContent = "Groups";
    }
  });

  document.querySelectorAll("span.font-header-2.dynamic-ellipsis-item").forEach(span => {
    if (span.textContent.trim() === "Communities") {
      span.textContent = "Groups";
    }
    if (span.getAttribute("title") === "Communities") {
      span.setAttribute("title", "Groups");
    }
  });

  document.querySelectorAll("input.groups-list-search-input").forEach(input => {
    if (input.placeholder === "Search My Communities") {
      input.placeholder = "Search My Groups";
    }
  });

  document.querySelectorAll("span.linkable-button-content-container").forEach(span => {
    if (span.textContent.trim() === "Create Community") {
      span.textContent = "Create Group";
    }
  });

  document.querySelectorAll("li.contextual-menu-actions-menu-item").forEach(li => {
    if (li.textContent.trim().startsWith("Leave Community")) {
      li.firstChild.textContent = "Leave Group";
    }
  });

  document.querySelectorAll("a.btn-secondary-xs.btn-more.see-all-link-icon").forEach(a => {
    if (a.textContent.trim() === "Back to Community") {
      a.textContent = "Back to Group";
    }
  });

  document.querySelectorAll("span.ng-binding").forEach(span => {
    if (span.textContent.trim() === "Community Funds:") {
      span.textContent = "Group Funds:";
    }
  });

  document.querySelectorAll("li.contextual-menu-actions-menu-item").forEach(li => {
    if (li.textContent.trim().startsWith("Configure Community")) {
      li.firstChild.textContent = "Configure Group";
    }
  });
  };

  renameBuzzwords();

  const observer = new MutationObserver(() => renameBuzzwords());
  observer.observe(document.body, { childList: true, subtree: true });
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
  
  async function exponentialBackoffRetry(attempt) {
      const MinDelay = 2000
      const MaxDelay = 60000

      const delay = Math.min(MinDelay * Math.pow(2, attempt), MaxDelay);
      console.warn(`Rate limit reached. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
  }

  async function Delay2() {
      if (Count != Total) {
          setTimeout(Delay2, 100);
      } else {
          const batchSize = 20;
          const maxRetries = 5;

          for (let i = 0; i < Universes.length; i += batchSize) {
              const chunk = Universes.slice(i, i + batchSize);
              const filteredChunk = chunk.filter(id => !RequestedUniverses.has(id));

              if (filteredChunk.length === 0) continue;

              const params = filteredChunk.join(",");
              const url = `https://games.roblox.com/v1/games?universeIds=${encodeURIComponent(params)}`;

              let success = false;
              let attempts = 0;

              while (!success && attempts < maxRetries) {
                  try {
                      const response = await fetch(url);

                      if (response.status === 200) {
                          const data = await response.json();
                          for (const info of data.data) {
                              GameCounts[info.id] = info.playing;
                          }
                          success = true;
                      } else if (response.status === 429) {
                          console.warn('Rate limit hit, retrying...');
                          await exponentialBackoffRetry(attempts);
                          attempts++;
                      } else {
                          console.error('Request failed with status: ' + response.status);
                          break;
                      }
                  } catch (error) {
                      console.error('Network error:', error);
                      break;
                  }
              }

              if (!success) {
                  console.error(`Failed to process chunk: ${filteredChunk.join(",")}`);
              }

              filteredChunk.forEach(id => RequestedUniverses.add(id));
              
              await new Promise(resolve => setTimeout(resolve, 10000));
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

function TurnOnToggle9() {
  let executed = false; // Prevent setTimeout from running multiple times
  const intervalId = setInterval(() => {
    const wrappers = document.querySelectorAll('.game-sort-carousel-wrapper');
    
    wrappers.forEach(wrapper => {
      if (wrapper.textContent.includes("Today's Picks")) {
        wrapper.remove();
        clearInterval(intervalId);

        if (!executed) {
          executed = true;
          setTimeout(() => {
            const friendCarousel = document.querySelector('.friend-carousel-container');

            if (friendCarousel && friendCarousel.nextElementSibling) {
              friendCarousel.nextElementSibling.remove();
            }
          }, 500);
        }
      }
    });
  }, 500);
}

function TurnOnToggle10() {
  if (window.location.href.includes("/catalog/")) {
    const badgeId = window.location.href.match(/\/catalog\/(\d+)\//)[1];

    const apiUrl = `https://economy.roblox.com/v2/assets/${badgeId}/details`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(apiUrl);
        console.log("catalog Data:", data);

        setTimeout(() => {
          const createdDate = data.Created
            ? new Date(data.Created).toLocaleDateString()
            : "N/A";
          const updatedDate = data.Updated
            ? new Date(data.Updated).toLocaleDateString()
            : "N/A";

          const newContent = document.createElement('div');
          newContent.classList.add('clearfix', 'item-field-container');
          newContent.innerHTML = `
              <div class="clearfix item-info-row-container"><div class="font-header-1 text-subheader text-label text-overflow row-label">Created</div><span id="type-content" class="font-body text wait-for-i18n-format-render">${createdDate}</span></div>
          `;

          const newContent2 = document.createElement('div');
          newContent2.classList.add('clearfix', 'item-field-container');
          newContent2.innerHTML = `
              <div class="clearfix item-info-row-container"><div class="font-header-1 text-subheader text-label text-overflow row-label">Updated</div><span id="type-content" class="font-body text wait-for-i18n-format-render">${updatedDate}</span></div>
          `;

          const itemDetailsDiv = document.getElementById('item-details');
          if (itemDetailsDiv) {
            itemDetailsDiv.appendChild(newContent);
            itemDetailsDiv.appendChild(newContent2);
          } else {
            console.warn("Element with id 'item-details' not found.");
          }
        }, 500);
      })
      .catch(error => console.error("Error fetching badge data:", error));
  }
}
