import React, { Fragment, useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from './Landing.module.css';
import './Landing.animation.css';

export const Landing: React.FC = () => {
    const nodeRef1 = useRef(null);
    const nodeRef2 = useRef(null);
    const progressRef = useRef(null);
    const alertRef = useRef(null);
    const vidRef = useRef<HTMLVideoElement>(null);
    const [portname, setPortname] = useState<string>("")
    const [worldname, setWorldname] = useState<string>("ザ・セカイ")
    const [linking, setLinking] = useState<boolean>(false)
    const [linkstarted, setLinkstarted] = useState<boolean>(false)
    const [loadingWorld, setLoadingWorld] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [retryLeftCount, setRetryLeftCount] = useState<number>(5)

    const portnameOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setPortname(newValue)
    }

    const loginButtonTrigger = (e: React.FormEvent) => {
        e.preventDefault();
        if (retryLeftCount === 0 && portname === "tja") {
            // stinger
            // display description of TJA
            return
        }
        if (portname !== "sotugyou") {
            setShowAlert(true);
        } else {
            setLinking(true)
        }
    }

    const updateRetryLeft = () => {
        let currentRetryLeftCount = retryLeftCount - 1
        if (currentRetryLeftCount < 0) {
            currentRetryLeftCount = 0
        }
        setRetryLeftCount(currentRetryLeftCount)
    }

    return (
        <Fragment>
            <div className={styles.landingWrapper}>
                <video 
                    ref={vidRef}
                    className={styles.bgVideo}
                    autoPlay={false}
                    preload="auto"
                >
                    <source src="/assets/video/linkstart.mp4" type="video/mp4" />
                </video>
                <CSSTransition
                    nodeRef={nodeRef1}
                    in={loadingWorld}
                    timeout={2000}
                    classNames="slideUp"
                    onEntered={() => {
                        setTimeout(() => {
                            vidRef.current?.play()
                        }, 400)
                    }}
                >
                    <div ref={nodeRef1}>
                        <h1 className={styles.headTitle}>
                            {worldname}
                        </h1>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={linkstarted}
                    nodeRef={nodeRef2}
                    timeout={1500}
                    classNames="slideDown"
                    onEntering={() => {
                        setLoadingWorld(true)
                    }}
                >
                    <div ref={nodeRef2} className={styles.loginCard}>
                        <div className={styles.loginCardTopBar}></div>
                        <div className={styles.cardInput}>
                            <p className={styles.label}>人数</p>
                            <input className={styles.input} type="number" placeholder="6" value={6} readOnly />
                        </div>
                        <div className={styles.cardInput}>
                            <p className={styles.label}>セカイネーム</p>
                            <input 
                                className={styles.input} 
                                type="text" 
                                placeholder="Port Name" 
                                value={portname}
                                onChange={portnameOnChange}
                            />
                        </div>
                        <div className={styles.loginButtonWrapper}>
                            <button 
                                className={styles.loginButton}
                                type="submit"
                                onClick={loginButtonTrigger}
                            >
                                リンクスタート
                            </button>
                        </div>
                        <CSSTransition 
                            nodeRef={progressRef}
                            in={linking}
                            timeout={4000}
                            classNames="progress"
                            onEntering={() => {
                                setWorldname("ザワールドに入ってる");
                            }}
                            onEntered={() => {
                                setLinkstarted(true)
                            }}
                        >
                            <div ref={progressRef} className={styles.progress}></div>
                        </CSSTransition>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={showAlert}
                    nodeRef={alertRef}
                    timeout={300}
                    unmountOnExit
                    classNames="alert"
                    onExited={() => {
                        updateRetryLeft()
                    }}
                >
                    <div ref={alertRef} className={styles.alertBg}>
                        <div className={styles.alertCover}>
                            <div className={styles.alertWindow}>
                                <div 
                                    className={styles.alertInner}
                                    onClick={() => { 
                                        setShowAlert(false)
                                    }}
                                >
                                    {retryLeftCount === 0 ? "ACCESS DENIED" : "NOT FOUND"}
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </Fragment>
    )
}