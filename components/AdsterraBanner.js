import { useEffect, useRef } from 'react'

export default function AdsterraBanner({ key, height, width }) {
    const banner = useRef()

    useEffect(() => {
        const atOptions = {
            key: '824a1c2241cfeb27b4e65ddbf386390a',
            format: 'iframe',
            height: 100,
            width: 300,
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
    }, [banner, key, height])

    return <div className="border justify-content-center align-items-center text-white text-center" ref={banner}></div>
}