
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')


const testo = []
testo.push("------------------")
testo.push("Ciao a tutte")
testo.push("e a tutti!")
testo.push("------------------")

function loop(t){
    const r = 1//window.devicePixelRatio
    const w = Math.floor(ctx.canvas.clientWidth * r)
    const h = Math.floor(ctx.canvas.clientHeight * r)

    // Resize
    if (canvas.width != w || canvas.height != h){
        canvas.width = w
        canvas.height = h
    }

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, w, h)

    ctx.font = "25px Helvetica, Arial, sans-serif";

    ctx.save()
    ctx.translate(200, 200)
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'lightblue'

    for (let j=0; j<testo.length; j++){
        let x = 0
        let y = j * 30
        const riga = testo[j]
        for (let i=0; i<riga.length; i++){
            const char = riga[i]
            const oy = Math.sin(t * 0.005 + i*(j+0.2)) * 4
            ctx.fillText(char, x, y + oy)
            ctx.beginPath()
            ctx.moveTo(x, y+10)
            ctx.lineTo(x, y-20)
            ctx.stroke()
            x += ctx.measureText(char).width
        }
    }
    ctx.restore()
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)