
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const FONT = "25px Helvetica, Arial, sans-serif"
ctx.font = FONT

const testo = []
testo.push("Lorem ipsum dolor sit amet consectetur adipiscing")
testo.push("elit porta pulvinar conubia, tellus dui purus")
testo.push("ad class blandit dictum malesuada potenti odio sociosqu,")
testo.push("vitae sociis ut tortor per venenatis faucibus")
testo.push("nibh cubilia.")
testo.push("Neque per sed proin cursus nascetur ullamcorper aliquet,")
testo.push("habitant duis quis vitae vehicula risus, himenaeos")
testo.push("varius feugiat sociosqu nulla purus.")
testo.push("Mi vestibulum suscipit porta scelerisque facilisis")
testo.push("nulla dis facilisi curabitur, pulvinar netus ante habitant")
testo.push("orci auctor vivamus magna pretium, varius")
testo.push("semper turpis mus laoreet lacus ullamcorper gravida.")


const particelle = []

for (let j=0; j<testo.length; j++){
    let x = 50
    let y = 80 + j * 30
    const riga = testo[j]
    for (let i=0; i<riga.length; i++){
        const char = riga[i]
        const w = ctx.measureText(char).width
        const particella = {
            c   : char,
            x   : x,
            y   : y,
            w   : w,
            h   : 25,
            dx  : x,
            dy  : y,
            vx  : 0,
            vy  : 0,
            ang : 0
        }
        x += w
        if (char != " ") {
            particelle.push(particella)
        }
    }
}

const pointer = {
    x : 0,
    y : 0
}

canvas.addEventListener("mousemove", function(e){
    pointer.x = e.clientX
    pointer.y = e.clientY
})

function loop(t){
    const r = 1//window.devicePixelRatio
    const w = Math.floor(ctx.canvas.clientWidth * r)
    const h = Math.floor(ctx.canvas.clientHeight * r)

    // Resize
    if (canvas.width != w || canvas.height != h){
        canvas.width = w
        canvas.height = h
    }

    for (const p of particelle) {
        let dx = p.x - pointer.x
        let dy = p.y - pointer.y
        const distanza = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

        if (distanza < 50) {
            dx = dx / 50
            dy = dy / 50
            p.vx = dx
            p.vy = dy
            p.dx += dx * (50 - distanza)
            p.dy += dy * (50 - distanza)
        }

        p.vx *= 0.98
        p.vy *= 0.98
        p.ang += p.vx * 0.05 + p.vy * 0.05
        p.dx += p.vx
        p.dy += p.vy
        p.x += (p.dx - p.x) * 0.05
        p.y += (p.dy - p.y) * 0.05
    }

    ctx.save()
    ctx.font = FONT
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'black'

    for (const p of particelle) {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.ang)
        ctx.fillText(p.c, 0, 0)
        ctx.restore()
    }

    ctx.restore()
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)


