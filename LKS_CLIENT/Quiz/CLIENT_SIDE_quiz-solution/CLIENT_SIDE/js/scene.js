class Scene {
    constructor() {
        this.data = null
        this.index = this.getIndexFromStorage()
        this.objects = []
        this.avatar = new Avatar()

        fetch('./assets/game-location.json').then(async response => {
            this.data = await response.json()
            this.render()
        })
    }

    getIndexFromStorage() {
        return parseInt(window.localStorage.getItem('scene') || '0')
    }

    saveIndexToStorage() {
        window.localStorage.setItem('scene', this.index)
    }

    render(index = this.index) {
        if (this.data === null) return false

        this.clear()

        this.index = index
        this.saveIndexToStorage()
        const currentScene = this.data[this.index]

        this.renderBackground()

        // render object
        currentScene.components.forEach(component => {
            const object = new Object(component, `./assets/scene-${this.index + 1}/`)
            this.objects.push(object)
            game.objectContainerEl.appendChild(object.object)
        });

        // render quiz
        currentScene.quizzes.forEach(quizData => {
            const quiz = new Quiz(quizData)
            quiz.renderBarrier(`./assets/scene-${this.index + 1}/quiz-barrier.png`)
        })

        // render main content
        this.renderMainContent(currentScene['main-content'])

        this.avatar.render(`./assets/scene-${this.index + 1}/`)
    }

    renderMainContent(data) {
        let el
        if (data.type == 'video') {
            el = document.createElement('video')
            el.controls = true
        } else {
            el = document.createElement('img')
        }

        el.classList.add('object')
        el.classList.add('object-in')
        setTimeout(() => {
            el.classList.remove('object-in')
        }, 400);
        el.src = `./assets/${data.src}`
        el.style.left = `${data.property.x}px`
        el.style.top = `${data.property.y}px`
        el.style.width = `${data.property.w}px`
        el.style.height = `${data.property.h}px`
        el.style.zIndex = data.property['z-index']

        game.objectContainerEl.appendChild(el)
    }

    renderBackground() {
        this.background = document.createElement('img')
        this.background.src = `./assets/scene-${this.index + 1}/background-scene-${this.index + 1}.png`
        this.background.classList.add('background')
        game.objectContainerEl.appendChild(this.background)
    }

    update() {
        this.avatar.update()
    }

    next() {
        if (this.index + 1 > this.data.length - 1) {
            this.finish()
            return false
        }
        this.render(this.index + 1)
        return true
    }

    finish() {
        const el = document.getElementById('finish')
        el.classList.remove('hidden')
    }

    clear() {
        this.avatar.clear()
        this.objects.forEach(object => object.remove())
        this.background?.remove()
        game.objectContainerEl.innerHTML = ''
        game.quizBarrierContainerEl.innerHTML = ''
    }

    prev() {
        if (this.index - 1 < 0) return false
        this.render(this.index - 1)
        return true
    }
}