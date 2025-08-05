import { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
// import { toast } from "sonner";
// amarillo 'ffed00'
// rosa 'e6007e'
// azul '009fe3'
const segments = [
  {
    id: 1,
    value: 'GIFT CARd',
    color: 'bg-[#e6007e]',
    textColor: 'text-white',
  },
  {
    id: 2,
    // value: 'DESCUENTO',
    color: 'bg-white',
    textColor: 'text-white',
  },
  {
    id: 3,
    value: 'MUESTRA',
    color: 'bg-[#ffed00]',
    textColor: 'text-black',
  },
  {
    id: 4,
    value: 'DESCUENTO',
    color: 'bg-[#009fe3]',
    textColor: 'text-white',
  },
  {
    id: 5,
    // value: 'CUPÓN',
    color: 'bg-white',
    textColor: 'text-white',
  },
  {
    id: 6,
    value: 'GIFT CARD',
    color: 'bg-[#e6007e]',
    textColor: 'text-white',
  },
  {
    id: 7,
    // value: 'REGALO',
    color: 'bg-white',
    textColor: 'text-white',
  },
  {
    id: 8,
    value: 'MUESTRA',
    color: 'bg-[#ffed00]',
    textColor: 'text-black',
  },
  {
    id: 9,
    value: 'DESCUENTO',
    color: 'bg-[#009fe3]',
    textColor: 'text-black',
  },
  {
    id: 10,
    // value: 'JACKPOT',
    color: 'bg-WHITE  ',
    textColor: 'text-white',
  },
]

export const Ruleta = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  // const [lastResult, setLastResult] = useState(null)
  const wheelRef = useRef(null)
  // const [spinCount, setSpinCount] = useState(0)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    // setSpinCount((prev) => prev + 1)

    // Generar resultado aleatorio
    const randomSegment = segments[Math.floor(Math.random() * segments.length)]

    // Calcular rotación final - ajustar para que el segmento ganador quede en la parte superior
    const segmentAngle = 360 / segments.length
    // El triángulo apunta hacia abajo, así que queremos que el centro del segmento ganador esté en la parte superior (270 grados)
    const selectedIndex = segments.findIndex((s) => s.id === randomSegment.id)
    const targetAngle = 270 - selectedIndex * segmentAngle

    // Agregar rotaciones extra para el efecto visual (4-6 vueltas completas)
    const extraRotations = (4 + Math.random() * 2) * 360
    const finalRotation = extraRotations + targetAngle

    if (wheelRef.current) {
      // Remover cualquier animación previa
      wheelRef.current.style.transition = 'none'
      wheelRef.current.style.transform = 'rotate(0deg)'

      // Forzar un reflow para asegurar que el reset se aplique
      wheelRef.current.offsetHeight

      // Aplicar la animación de giro (empieza rápido, desacelera gradualmente por 4 segundos)
      wheelRef.current.style.transition =
        'transform 4s cubic-bezier(0, 0, 0.1, 1)'
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`
    }

    // Mostrar resultado después de la animación
    setTimeout(() => {
      setIsSpinning(false)
      // setLastResult(randomSegment.value)

      console.log('Resultado:', randomSegment.value) // Debug

      // toast.success(`¡Resultado: ${randomSegment.value}!`, {
      //   description: `¡Felicitaciones! Has ganado ${randomSegment.value}`,
      //   duration: 5000,
      // });
    }, 4000)
  }

  return (
    <div className='overflow-hidden flex flex-col items-center justify-between min-h-screen bg-white lg:p-16 py-16 '>
      <div className='text-center mb-8 w-full '>
        <h1 className='text-[2rem] font-bold mb-2 text-black tracking-tight  leading-none'>
          Ruleta de Premios
        </h1>
        <p className='text-muted-foreground'>
          ¡Gira la ruleta y gana increíbles premios!
        </p>
      </div>

      {/* Contenedor de la ruleta */}
      <div className='relative mb-8'>
        {/* Círculo trasero con cilindros de metal */}
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
        w-[320px] h-[320px]
        lg:w-[580px] lg:h-[580px] 
        sm:w-[500px] sm:h-[500px]
        rounded-full bg-white shadow-2xl'>
          {/* Cilindros de metal alrededor del círculo */}
          {Array.from({ length: 20 }).map((_, i) => {
            const cylinderAngle = (360 / 20) * i
            const x = 50 + 48 * Math.cos((cylinderAngle * Math.PI) / 180)
            const y = 50 + 48 * Math.sin((cylinderAngle * Math.PI) / 180)
            return (
              <div
                key={i}
                className='absolute w-2 h-2 bg-gradient-to-tr  from-gray-800 to-gray-white rounded-full  shadow-lg'
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )
          })}
        </div>

        {/* Indicador superior - Triángulo selector */}
        <div className='absolute -top-12 left-1/2  transform -translate-x-1/2 z-20 rotate-180'>
          <div className='w-0 h-0 border-l-[36px] border-r-[36px] border-b-[64px]  border-l-transparent border-r-transparent  border-b-yellow-400 drop-shadow-2xl'></div>
        </div>

        {/* Decoraciones alrededor */}

        {/* Ruleta */}
        <Card className='relative w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[530px] lg:h-[530px] rounded-full shadow-ruleta overflow-hidden bg-white border-8 border-gray-100 z-10 shadow-xl/30'>
          <div
            ref={wheelRef}
            className='w-full h-full rounded-full relative'
            style={{
              transformOrigin: 'center',
              willChange: 'transform',
            }}>
            {segments.map((segment, index) => {
              const angle = (360 / segments.length) * index
              const nextAngle = (360 / segments.length) * (index + 1)

              // Crear múltiples puntos en el arco para hacer el borde circular
              const points = []
              points.push('50% 50%')
              // Centro

              // Agregar puntos del arco
              for (let i = 0; i <= 20; i++) {
                const currentAngle = angle + (nextAngle - angle) * (i / 20)
                const x = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180)
                const y = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180)
                points.push(`${x}% ${y}%`)
              }
              const yOffset =
                window.innerWidth < 640
                  ? -100
                  : window.innerWidth < 768
                  ? -150
                  : window.innerWidth < 1024
                  ? -180
                  : -200
              return (
                <div key={segment.id}>
                  {/* Segmento de color con borde blanco */}
                  <div
                    className={`absolute w-full h-full ${segment.color} rounded-full border-2 border-white`}
                    style={{
                      clipPath: `polygon(${points.join(', ')})`,
                    }}
                  />
                  {/* Texto centrado en el segmento */}
                  <div
                    className={`absolute ${segment.textColor} font-bold select-none pointer-events-none text-[0.6rem] sm:text-[0.8rem] lg:text-[1.2rem] `}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${
                        angle + (360 / segments.length) * 3
                      }deg) translateY(${yOffset}px)`,

                      zIndex: 20,
                      // fontSize: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}>
                    {segment.value ? (
                      segment.value
                    ) : (
                      <img
                        src='/logo/SVG/isotipo.svg'
                        className='h-10 w-10 object-contain'
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Centro de la ruleta con logo */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          sm:w-36 sm:h-36
          lg:w-42 lg:h-42
           bg-white rounded-full border-4 border-gray-200 shadow-2xl flex items-center justify-center'>
            <div className='text-3xl font-bold text-gray-700'>
              <img
                src='/logo/imagotipo.svg'
                alt=''
                className=' w-16 h-16 lg:h-24 lg:w-24 object-contain'
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Botón de giro */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        size='lg'
        className={`px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
          isSpinning
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:scale-105 shadow-lg'
        }`}
        style={{
          background: 'var(--gradient-button)',
          border: 'none',
        }}>
        {isSpinning ? '🌀 Girando...' : '🎯 ¡GIRAR RULETA!'}
      </Button>

      {/* Información de resultado */}
      {/* <div className='mt-8 text-center'>
        {lastResult && (
          <Card className='p-6 bg-gradient-ruleta'>
            <p className='text-white font-bold text-xl'>
              🎉 ¡Ganaste: <span className='text-2xl'>{lastResult}</span>! 🎉
            </p>
          </Card>
        )}
        <p className='text-muted-foreground mt-4'>
          Giros realizados:{' '}
          <span className='font-bold text-foreground'>{spinCount}</span>
        </p>
      </div> */}
    </div>
  )
}
