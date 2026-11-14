class Gun {
    constructor() {
        this.timer = timer
        this.player = player

        this.gunSrc = sessionStorage.getItem('gun')
        this.content = document.getElementById('content')
        this.pointer = document.getElementById('pointer')
        this.gun = document.getElementById('gun')

        window.addEventListener('keydown', this.change.bind(this))
        this.content.addEventListener('mousemove', this.PointerFollowMouse.bind(this))
        this.content.addEventListener('click', this.shoot.bind(this))
    }

    PointerFollowMouse(e) {
        const y = e.clientY - this.content.offsetTop
        const x = e.clientX - this.content.offsetLeft
        this.pointer.style.top = `${y}px`
        this.pointer.style.left = `${x}px`
        this.gun.style.left = `${x}px`
    }

    shoot(e) {
        const y = e.clientY - this.content.offsetTop
        const x = e.clientX - this.content.offsetLeft
        const effect = document.createElement('img')
        effect.src = './assets/boom.png'
        effect.classList.add('effect')
        effect.style.top = `${y}px`
        effect.style.left = `${x}px`
        this.content.appendChild(effect)
        setTimeout(() => {
            effect.remove()
        }, 200);

        const target = this.getTarget(e.clientX, e.clientY)
        if (target) {
            target.remove()
            this.player.scoreIncrease()
        } else {
            this.timer.time -= 5
        }
    }

    getTarget(x, y) {
        const elements = document.elementsFromPoint(x, y)
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('target')) {
                return elements[i]
            }
        }
        return false
    }

    change(e) {
        if (e.key == ' ') {
            if (this.gunSrc == 'gun1') {
                this.gunSrc = 'gun2'
                this.gun.style.transform = 'translate(0%, 100%)'
                setTimeout(() => {
                    this.gun.src = './assets/gun2.png'
                    this.gun.style.transform = 'translate(0%, 0%)'
                }, 200);
            } else {
                this.gunSrc = 'gun1'
                this.gun.style.transform = 'translate(0%, 100%)'
                setTimeout(() => {
                    this.gun.src = './assets/gun1.png'
                    this.gun.style.transform = 'translate(0%, 0%)'
                }, 200);
            }
        }
    }
}