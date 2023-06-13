import { useEffect, useRef } from 'react'

export default function AdsterraBanner() {
    const banner = useRef()

    useEffect(() => {
        const atOptions = {
            key: '824a1c2241cfeb27b4e65ddbf386390a',
            format: 'iframe',
            height: '50px',
            width: '100%',
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
    }, [banner])

    return <div className="mx-2 my-5  justify-content-center align-items-center text-white text-center" ref={banner}></div>
}