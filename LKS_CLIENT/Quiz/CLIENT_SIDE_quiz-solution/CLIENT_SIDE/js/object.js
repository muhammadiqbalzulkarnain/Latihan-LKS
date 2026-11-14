class Object {
    constructor(data, baseFolder) {
        this.object = document.createElement('img')
        this.data = data
        this.baseFolder = baseFolder
        this.clickSound = new Audio('./assets/sounds/object-sound.wav')

        this.create()
    }

    remove() {
        this.object.classList.add('out')
        setTimeout(() => {
            this.object.remove()
        }, 300);
    }

    create() {
        if (this.data.name == 'parallax-object') {
            const image = document.createElement('img')
            image.src = this.baseFolder + this.data.image
            image.style.width = `${this.data.property.w}px`
            image.style.height = `${this.data.property.h}px`

            const textBg = document.createElement('div')
            textBg.classList.add('parallax-background')

            const text = document.createElement('div')
            text.innerHTML = this.data?.text
            text.classList.add('parallax-text')

            this.object = document.createElement('div')
            this.object.classList.add('parallax-container')
            this.object.appendChild(image)
            this.object.appendChild(textBg)
            this.object.appendChild(text)
        } else {
            this.object.src = this.baseFolder + this.data.image
        }

        this.object.classList.add('object')
        this.object.classList.add('object-in')
        setTimeout(() => {
            this.object.classList.remove('object-in')
        }, 400);

        this.object.style.left = `${this.data.property.x}px`
        this.object.style.top = `${this.data.property.y}px`
        this.object.style.width = `${this.data.property.w}px`
        this.object.style.height = `${this.data.property.h}px`
        this.object.style.zIndex = `${this.data.property['z-index']}`
        this.object.style.rotate = `${this.data.property.rotation}deg`
        this.object.onclick = this.handleClick.bind(this)
    }

    handleClick() {
        if (this.data.name == 'fullscreen-button') {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                game.bodyEl.requestFullscreen()
            }
        }
        this.clickSound.play()

        this.object.classList.add('object-click')
        setTimeout(() => {
            this.object.classList.remove('object-click')
        }, 200);
    }
}