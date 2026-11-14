class Avatar {
    constructor() {
        this.pos = {
            x: 25,
            y: 0
        }
        this.getPosFromStorage()
        this.isChar = {
            left: false,
            right: false,
            up: false,
            down: false,
        }

        this.speed = 3

        this._handleKeyup = this.handleKeyup.bind(this)
        this._handleKeydown = this.handleKeydown.bind(this)
        this._handleClick = this.handleClick.bind(this)
    }

    render(baseFolder) {
        this.baseFolder = baseFolder
        this.avatar = document.createElement('img')
        this.avatar.src = baseFolder + 'avatar.png'
        this.avatar.classList.add('avatar')
        this.avatar.style.left = `${this.pos.x}px`
        this.avatar.style.top = `${this.pos.y}px`
        game.moveAreaEl.appendChild(this.avatar)
        this.listen()
    }

    clear() {
        document.removeEventListener('keydown', this._handleKeydown)
        document.removeEventListener('keyup', this._handleKeyup)
        game.moveAreaEl.removeEventListener('click', this._handleClick)
        this.avatar?.remove()
    }

    listen() {
        document.addEventListener('keydown', this._handleKeydown)
        document.addEventListener('keyup', this._handleKeyup)
        game.moveAreaEl.addEventListener('click', this._handleClick)
    }

    handleClick(e) {
        if (e.target.id !== 'move-area') return false

        this.pos.x = e.offsetX
        this.pos.y = e.offsetY
        this.avatar.classList.add('avatar-move')

        const click = document.createElement('div')
        click.classList.add('click-effect')
        click.style.left = `${e.offsetX}px`
        click.style.top = `${e.offsetY}px`
        game.moveAreaEl.appendChild(click)

        setTimeout(() => {
            this.avatar.classList.remove('avatar-move')
            click.remove()
        }, 400);
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.isChar.left = true
                break;
            case 'ArrowRight':
                this.isChar.right = true
                break;
            case 'ArrowUp':
                this.isChar.up = true
                break;
            case 'ArrowDown':
                this.isChar.down = true
                break;
        }
    }

    handleKeyup(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.isChar.left = false
                break;
            case 'ArrowRight':
                this.isChar.right = false
                break;
            case 'ArrowUp':
                this.isChar.up = false
                break;
            case 'ArrowDown':
                this.isChar.down = false
                break;
        }
    }

    update() {
        if (!this.avatar) return

        if (this.isChar.left) {
            if (this.pos.x <= 25) {
                if (game.scene.prev()) this.resetX(true)
                return
            }

            this.pos.x -= this.speed
            this.avatar?.classList.add('avatar-walk')
        } else if (this.isChar.right) {
            if (this.pos.x >= game.moveAreaEl.offsetWidth) {
                if (game.scene.next()) this.resetX()
                return
            }

            if (this.pos.x >= game.quizBarrierContainerEl.offsetLeft - 20 && game.quizBarrierContainerEl.children.length !== 0) {
                game.quizBarrierContainerEl.children.item(0).click()
                return
            }

            this.pos.x += this.speed
            this.avatar?.classList.add('avatar-walk')
        } else if (this.isChar.up) {
            if (this.pos.y <= 0) return

            this.pos.y -= this.speed
            this.avatar?.classList.add('avatar-walk')
        } else if (this.isChar.down) {
            if (this.pos.y >= game.moveAreaEl.offsetHeight) return

            this.pos.y += this.speed
            this.avatar?.classList.add('avatar-walk')
        } else {
            this.avatar?.classList.remove('avatar-walk')
        }

        this.avatar.style.left = `${this.pos.x}px`
        this.avatar.style.top = `${this.pos.y}px`

        this.savePosToStorage()
    }

    savePosToStorage() {
        window.localStorage.setItem('x', this.pos.x)
        window.localStorage.setItem('y', this.pos.y)
    }

    resetX(isInvert) {
        if (isInvert) {
            this.pos.x = game.moveAreaEl.offsetWidth
        } else {
            this.pos.x = 0
        }
        this.savePosToStorage()
    }

    getPosFromStorage() {
        const x = window.localStorage.getItem('x') || this.pos.x.toString()
        const y = window.localStorage.getItem('y') || this.pos.y.toString()
        this.pos.x = parseInt(x)
        this.pos.y = parseInt(y)
    }
}