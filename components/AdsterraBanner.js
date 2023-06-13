import { useEffect, useRef } from 'react'

export default function AdsterraBanner({ key, height, width }) {
    const banner = useRef()

    useEffect(() => {
        const atOptions = {
            key: key,
            format: 'iframe',
            height: height,
            width: width,
            params: {},
        }
        if (banner.current && !banner.current.firstChild) {
            const conf = document.createElement('script')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `//www.profitabledisplaynetwork.com/${atOptions.key}/invoke.js`
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

            banner.current.append(conf)
            banner.current.append(script)
        }
    }, [banner, key, height, width])

    return <div className="justify-content-center align-items-center text-white text-center" ref={banner}></div>
}