(function() {
  const sectionElementTemplate = (function() {
    section = document.createElement("section")
    const ctrl = document.createElement("div")
    ctrl.classList.add("ctrl")

    const movePrev = document.createElement("button")
    movePrev.classList.add("move-prev")
    movePrev.innerText = '←'
    ctrl.appendChild(movePrev)

    const play = document.createElement("button")
    play.classList.add("play")
    play.innerText = 'play'
    ctrl.appendChild(play)

    const pause = document.createElement("button")
    pause.classList.add("pause")
    pause.innerText = 'pause'
    ctrl.appendChild(pause)

    const moveNext = document.createElement("button")
    moveNext.innerText = '→'
    moveNext.classList.add("move-next")
    ctrl.appendChild(moveNext)

    section.appendChild(ctrl)

    const content = document.createElement("div")
    content.classList.add("content")
    section.appendChild(content)
    return section
  })();

  class Talk {
    constructor(text) {
      
    }
    play() {
      
    }
    pause() {

    }
  }
  class Page {
    constructor(talk, element, movePrevButton, moveNextButton, playButton, pauseButton) {
      this._talk = talk
      this._element = element
      this._movePrevButton = movePrevButton
      this._moveNextButton = moveNextButton
      this._playButton = playButton
      this._pauseButton = pauseButton

      this._nextPage = null
      this._prevPage = null

      moveNextButton.onclick = () => { this.moveNext() }
      movePrevButton.onclick = () => { this.movePrev() }
      playButton.onclick = () => { this.play() }
      pauseButton.onclick = () => { this.pause() }
    }
    element() {
      return this._element
    }
    hide() {
      this._element.style.display = 'none';
    }
    show() {
      this._element.style.display = 'block';
    }
    id() {
      return this._element.id
    }
    movePrev() {
      if (this._prevPage === null) {
        return
      }
      this.hide()
      this._prevPage.show()
    }
    moveNext() {
      if (this._nextPage === null) {
        return
      }
      this.hide()
      this._nextPage.show()
    }
    play() {
      this._talk.play()
    }
    pause() {
      this._talk.pause()
    }
  }

  window.Autolt = function(pageAttributes, selector) {
    const pages = [];
    const updateVisibility = function() {
      let shown = false
      for (let p of pages) {
        if ('#' + p.id() === location.hash) {
          p.show()
          shown = true
        } else {
          p.hide()
        }
      }
      if (!shown) {
        pages[0].show()
      }
    }

    window.addEventListener('hashchange', updateVisibility)
    const container = document.querySelector(selector)
    for(let [i, pageAttribute] of pageAttributes.entries()) {
      const s = sectionElementTemplate.cloneNode(true);
      s.id = `p${i}`
      s.querySelector('.content').innerHTML = pageAttribute.html;
      const p = new Page(
        new Talk(pageAttribute.talk),
        s,
        s.querySelector('.move-prev'),
        s.querySelector('.move-next'),
        s.querySelector('.play'),
        s.querySelector('.pause')
      )
      pages.push(p);
    }
    for(let i = 0; i < pages.length - 1; ++i) {
      if (i < pages.length - 1) {
        pages[i]._nextPage = pages[i + 1];
        pages[i + 1]._prevPage = pages[i]
      }
    }
    for(let p of pages) {
      container.appendChild(p.element())
    }
    updateVisibility()
  };
})();
