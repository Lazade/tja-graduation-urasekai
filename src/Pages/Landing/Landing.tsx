import React, { Fragment, useState, useRef, useEffect, KeyboardEvent } from "react";
import Typewriter from "typewriter-effect";
import { CSSTransition } from "react-transition-group";
import styles from './Landing.module.css';
import './Landing.animation.css';

export const Landing: React.FC = () => {
    const nodeRef1 = useRef(null);
    const nodeRef2 = useRef(null);
    const progressRef = useRef(null);
    const alertRef = useRef(null);
    const tjaAlertRef = useRef(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const vidRef = useRef<HTMLVideoElement>(null);
    const [inputLabel, setInputLabel] = useState<string>("")
    const [submitButtonLabel, setSubmitButtonLabel] = useState<string>("")
    const [portname, setPortname] = useState<string>("")
    const [worldname, setWorldname] = useState<string>("ザ・セカイ")
    const [linking, setLinking] = useState<boolean>(false)
    const [linkstarted, setLinkstarted] = useState<boolean>(false)
    const [loadingWorld, setLoadingWorld] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [showTjaAlert, setShowTjaAlert] = useState<boolean>(false)

    const portnameOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setPortname(newValue)
    }

    const loginButtonTrigger = (e: React.FormEvent) => {
        e.preventDefault();
        if (portname === "") { return }
        if (portname === "tja" && isAdmin) {
            setShowTjaAlert(true)
        }
        if (portname !== "sotugyou") {
            setShowAlert(true);
        } else {
            setLinking(true)
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
            submitButtonRef.current?.click();
        }
    }

    const loginCardTopBarClick = () => {
        const currentIsAdmin = isAdmin;
        setIsAdmin(!currentIsAdmin);
        if (isAdmin) {
            setInputLabel("管理者ID")
            setSubmitButtonLabel("ログイン")
        } else {
            setInputLabel("セカイのネーム")
            setSubmitButtonLabel("リンクスタート")
        }
        setPortname("")
    }

    useEffect(() => {
        if (isAdmin) {
            setInputLabel("管理者ID")
            setSubmitButtonLabel("ログイン")
        } else {
            setInputLabel("セカイのネーム")
            setSubmitButtonLabel("リンクスタート")
        }
    }, [isAdmin])

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
                    <div ref={nodeRef2} className={styles.loginCard + " " + (isAdmin ? styles.isAdmin : "")}>
                        <div 
                            className={styles.loginCardTopBar}
                            onClick={loginCardTopBarClick}
                        ></div>
                        <div className={styles.cardInput}>
                            <p className={styles.label}>{inputLabel}</p>
                            <input 
                                className={styles.input}
                                type="text" 
                                placeholder="" 
                                value={portname}
                                onChange={portnameOnChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className={styles.loginButtonWrapper}>
                            <button 
                                className={styles.loginButton}
                                ref={submitButtonRef}
                                type="submit"
                                onClick={loginButtonTrigger}
                            >
                                {submitButtonLabel}
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
                >
                    <div ref={alertRef} className={styles.alertBg}>
                        <div className={styles.alertCover}>
                            <div className={styles.alertWindow}>
                                <div 
                                    className={styles.alertInner}
                                    onClick={() => {
                                        setShowAlert(false)
                                    }}
                                    onKeyDown={() => {}}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={showTjaAlert}
                    nodeRef={tjaAlertRef}
                    timeout={300}
                    unmountOnExit
                    classNames="alert"
                >
                    <div className={styles.alertBg}>
                        <div className={styles.alertCover}>
                            <div className={styles.alertTerminalWindow}>
                                <div className={styles.alertTerminalWindowInner}>
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter.pauseFor(1000)
                                                .typeString('.')
                                                .pauseFor(1000)
                                                .typeString('.')
                                                .pauseFor(1000)
                                                .typeString('.')
                                                .pauseFor(1000)
                                                .deleteAll()
                                                .pauseFor(1000)
                                                .typeString('<p>こんにちは</p>')
                                                .pauseFor(500)
                                                .typeString('<br/><p>私たちTOKYO JAPANESE ACADEMYの理念は、</p>')
                                                .typeString('<p>より幅広い人材に日本語教育の機会を提供し、</p>')
                                                .typeString('<p>日本の大学・大学院・専門学校へ進学し日本及び他国で</p>')
                                                .typeString('<p>活躍する人材のキャリアを支援することです。</p>')
                                                .typeString('<p>また外国との人材交流を通じ、</p>')
                                                .typeString('<p>日本社会のグローバル化推進の一助となります。</p>')
                                                .pauseFor(1000)
                                                .typeString('<br/>')
                                                .typeString('<p>TJA ITコースは、みなさんの就職実現に必要な日本教育を最短で徹底指導します。</p>')
                                                .pauseFor(1000)
                                                .typeString('<br/>')
                                                .typeString('<br/>')
                                                .typeString('<p style="text-align:right">つづく</p>')
                                                .start();
                                        }}
                                        options={{
                                            delay: 50,
                                            deleteSpeed: 1
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </Fragment>
    )
}