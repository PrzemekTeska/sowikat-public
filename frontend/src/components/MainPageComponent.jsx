import React, { useEffect } from 'react';
import nowoczesne_domki from '../nowoczesne_domki.jpg';
import bogate_wyposazenie from '../bogate_wyposazenie.jpg';
import swietna_lokalizacja from '../swietna_lokalizacja.jpg';
import Aos from 'aos';
import "aos/dist/aos.css";
import FooterComponent from './FooterComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const props = {
    style: { display: "inline" }
}


const MainPageComponent = () => {



    useEffect(() => {
        Aos.init({ duration: 3000, disable: 'mobile' });

    }, []);


    return (

        <section id="main-page-bg">
            <div id="main-page-container">
                <div id="domki-description-img" data-aos-once="true" data-aos="fade-right" >
                    <LazyLoadImage id="main-page-pic2" effect="blur" src={nowoczesne_domki} alt="domki" wrapperProps={props} />
                </div>
                <div data-aos-once="true" data-aos="fade-left" id="domki-description">
                    <h1 className="main-page-header">Nowoczesne domki</h1>
                        Nowy kompleks 5 domków całorocznych, komfortowo wyposażonych. Budowę zakończyliśmy w 2021 roku. Każdy dom składa się z dwóch sypialni, w pełni
                        wyposażonej kuchni i łazienki,
                        salonu z klimatyzacją na upalne dni oraz kominkiem na chłodne wieczory. Standard domków wraz ze spokojną lokalizacją
                        na skraju lasu gwarantują relaksujący wypoczynek.
                    </div>
                <div data-aos-once="true" data-aos="fade-right" id="plaza-description">
                    <h1 className="main-page-header">Świetna lokalizacja</h1>
                    Lubiatowo jest małą wsią położoną w województwie pomorskim, w gminie Choczewo, w odległości około 2.5 km od linii brzegowej Bałtyku. Domki letniskowe "Sowi Kąt" z dwóch stron otoczone są lasem. Panuje tam cisza i spokój. Każdy z nas potrzebuje chwili wyciszenia, czasu do refleksji – może nam w tym pomóc 20 minutowy spacer po lesie, który zaprowadzi nas na piękną plażę nad naszym polskim morzem. Alternatywą jest również możliwość dojazdu na plażę własnym środkiem transportu. Jeżeli jesteś miłośnikiem ciszy, spokoju, lubisz słuchać dźwięków lasu, szum morza to znalazłeś idealne miejsce na spokojny wypoczynek od codziennych obowiązków. 
                </div>
                <div data-aos-once="true" data-aos="fade-left">
                    <LazyLoadImage id="main-page-pic6" effect="blur" src={swietna_lokalizacja} alt="domki" wrapperProps={props} />
                </div>
                <div data-aos-once="true" data-aos="fade-right">
                    <LazyLoadImage id="main-page-pic3" effect="blur" src={bogate_wyposazenie} alt="domki" wrapperProps={props} />
                </div>


                <div data-aos-once="true" data-aos="fade-left" id="equip-description">
                    <h1 className="main-page-header">Bogate wyposażenie</h1>
                    "Sowi Kąt" składa się z 5 w pełni wyposażonych domków. Budowa została zakończona w 2021 roku. Każdy domek posiada dwie sypialnie, znajdujące się na górze. Jedna duża małżeńska – z możliwością dostawienia łóżeczka dziecięcego.<br/> W pokoju znajduje się również mały taras, duża pojemna szafa oraz stół z krzesłami. W drugiej – mniejszej sypialni, znajdują się dwa łóżka pojedyncze oraz pojemna szafa na ubrania. Parter składa się z salonu, kuchni oraz łazienki. W salonie znajduję się duża rozkładana rogówka z możliwością spania, stolik kawowy, telewizor 50 cali oraz kominek z dytrybucją gorącego powietrza. W części kuchennej znajduję się mała jadalnia – stół z 4 krzesłami. Kuchnia została w pełni wyposażona, w której skład wchodzi duża lodówka z zamrażarką, piekarnik, mikrofalówka, zmywarka, zlewozmywak, naczynia kuchenne. W łazience znajduję się duży prysznic z deszczownicą oraz tradycyjną rączką prysznicową. Dodatkowo każdy domek posiada klimatyzację, niezbędną na upalne dni. Na tarasie przed domkiem znajduję się bujana ławka, narożny zestaw wypoczynkowy oraz stały grill. 
                </div>
                <div data-aos-once="true" data-aos="fade" id="main-page-footer"><FooterComponent /></div>

            </div>
        </section>


    );
}

export default MainPageComponent;