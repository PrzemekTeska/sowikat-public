import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations'
import FooterComponent from './FooterComponent';
import header from '../regulamin.png'

const styles = {
    fadeIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }

}


class HouseRegulations extends Component {


    render() {

        return (
            <div className="box-wrapper">
                <StyleRoot>
                    <div className="box-bg" id="box-bg-regulations" style={styles.fadeIn}>
                    <img src={header} id="regulations-img" alt="Regulamin rezerwacji"/>
                        <div id="house-regulations-content">
                        Właściciele Sowiego Kątu będą Państwu bardzo wdzięczni za współpracę w przestrzeganiu niniejszego regulaminu, który ma służyć zapewnieniu 
spokoju i bezpieczeństwa pobytu wszystkich naszych Gości. <br/>
<ol>
    <li>Domki wynajmowane są na doby.</li>
    <li>Cisza nocna trwa od godz. 22 do godz. 7.</li>
    <li>Doba hotelowa trwa od godz. 15 do godz. 10.</li>
    <li>W momencie zameldowania pobierana jest kaucja. Kaucja jest zwrotna w momencie wymeldowania bez potrąceń o ile nie nastąpiły żadne 
zniszczenia budynku lub jego wyposażenia.</li>
    <li>Goście przybywający do Sowiego Kątu zobowiązani są do zameldowania przedstawiając odpowiedni dokument ze zdjęciem zgodnie z Ustawą
z dnia 10 kwietnia 1974r o ewidencji ludności i dowodach osobistych wraz z późniejszymi zmianami .Obowiązek ten dotyczy wszystkich osób 
zakwaterowanych w budynku.</li>
    <li>Opłata za cały deklarowany czas pobytu jest pobierana w momencie zameldowania wraz z kaucją , która podlega zwrotowi w momencie 
wymeldowania po sprawdzeniu stanu technicznego budynku . Wniesienie opłaty jest równoznaczne z akceptacją niniejszego Regulaminu.</li>
    <li>W przypadku rezygnacji z pobytu w trakcie jego trwania, nie zwracamy opłaty za nie wykorzystany okres wynajmu.</li>
    <li>Życzenie przedłużenia pobytu będzie uwzględnione w miarę posiadanych możliwości. Życzenie przedłużenia pobytu Gość powinien zgłosić do 
godz. 10 dnia poprzedzającego w którym upływa termin najmu budynku.</li>
    <li>W przypadku zastrzeżeń dotyczących jakości usług prosimy o jak najszybsze zgłaszanie ich do właścicieli, co w przyszłości umożliwi nam 
dostosowanie obiektu do oczekiwań Gości.</li>
    <li>Sowi Kąt ma obowiązek zapewnić:</li>
    <ul>
        <li>warunki nieskrępowanego wypoczynku Gości,</li>
        <li>bezpieczeństwo pobytu, zachowanie tajemnicy informacji o Gościach,</li>
        <li>przyjazną atmosferę i uprzejmą obsługę,</li>
        <li>na życzenie gości dodatkowa odpłatna wymiana pościeli i ręczników,</li>
        <li>udzielanie informacji związanych z pobytem i podróżą,</li>
        <li>dokonywanie niezbędnych napraw urządzeń podczas nieobecności Gościa a w przypadku jego obecności tylko gdy wyrazi zgodę i życzenie.</li>
    </ul>
    
    <li>Pościel i ręczniki służą na tygodniowy pobyt.</li>
    <li>Sowi Kąt nie ponosi żadnej odpowiedzialności za mienie Najemcy wniesione do obiektu.</li>
    <li>Sowi Kąt nie ponosi odpowiedzialności za uszkodzenie lub utratę samochodu bądź innego pojazdu należącego do Najemcy, zaparkowanego 
przy obiekcie lub na jego terenie.</li>
    <li>Najemca ma obowiązek powiadomienia Wynajmującego o zaistniałej szkodzie , awarii wyposażenia natychmiast po jej stwierdzeniu.</li>
    <li>Za zagubienie kluczy Najemca ponosi koszty zgodne z cennikiem.</li>
    <li>Najemca nie może przekazywać domu osobom trzecim, nawet jeżeli nie upłynął okres za który uiścił należną opłatę.</li>
    <li>Osoby nie zameldowane w Sowim Kącie mogą przebywać na terenie obiektu od godz. 7 do godz. 22. Sowi Kąt może odmówić dalszego 
świadczenia usług i zerwać zawartą Umowę z osobą , która narusza tę zasadę. W takim przypadku nie podlega zwrotowi należność za nie 
wykorzystany pobyt. W przypadku przebywania w obiekcie większej ilości osób niż zadeklarowana w momencie zameldowania Wynajmujący 
może zerwać zawartą Umowę i zażądać natychmiastowego opuszczenia obiektu bez zwrotu należności za nie wykorzystany pobyt.</li>
    <li>W obiekcie obowiązuje całkowity zakaz palenia tytoniu. Regulamin przewiduje karę pieniężną w kwocie 200 zł za łamanie tego zakazu, 
ponadto Sowi Kąt może odmówić dalszego świadczenia usług osobie, która narusza ten zakaz bez zwrotu opłaty za niewykorzystany pobyt i 
zażądać natychmiastowego opuszczenie obiektu.</li>
    <li>Gościom, którzy w sposób rażący naruszają niniejszy regulamin możemy odmówić dalszego świadczenia usług.</li>
    <li>Gość ponosi odpowiedzialność materialną za wszelkiego rodzaju uszkodzenie lub zniszczenie wyposażenia i urządzeń technicznych obiektu 
powstałe z jego winy lub z winy odwiedzających go osób. 
 W przypadku uszkodzenia wyposażenia lub samej struktury budynku lub innych strat spowodowanych przez Najemcę lub inne osoby 
przebywające w obiekcie wraz z nim wartość zniszczeń określana jest na podstawie załączonego cennika i potrącana z kaucji a jeżeli wartość
zniszczeń przekracza wartość kaucji z karty płatniczej Najemcy lub płatna gotówką . W przypadku częściowego uszkodzenia sprzętu nie 
określa się szkody procentowej w odniesieniu do pozycji w cenniku , sprzęt zostaje wymieniony na nowy a po jego wymianie Najemca może 
zabrać sprzęt częściowo uszkodzony.</li>
    <li>Sowi Kąt może odmówić przyjęcia osobie, która podczas poprzedniego pobytu rażąco naruszyła regulamin wyrządzając szkodę w mieniu 
obiektu lub innych osób przebywających w domkach albo w inny sposób zakłóciła pobyt Gości lub funkcjonowanie obiektu.</li>
    <li>Przedmioty pozostawione przez wyjeżdżającego Gościa na terenie Sowiego Kątu będą odesłane na koszt Gościa na wskazany przez niego 
adres. W przypadku nie otrzymania takiej dyspozycji, będą przechowywane przez okres 3 m-cy.</li>
    <li>Gość zobowiązany jest pozostawić kuchnie posprzątaną ( zmyte i wysuszone naczynia, sprzątnięty blat, kuchenka, zlewozmywak opróżniona 
lodówka, czyste naczynia ułożone w szafkach , śmieci wyniesione z całego domu do śmietnika ) w przeciwnym razie zostanie naliczona opłata 
za sprzątanie ( 150 zł ) zgodnie z cennikiem.</li>
    <li>Liczba osób zakwaterowanych w domu nie może być większa od zadeklarowanej w momencie zameldowania. Dzieci w wieku od ukończenia 7 
lat traktowane są jak dorośli. Na gościu spoczywa obowiązek okazania dokumentu potwierdzającego wiek dziecka.</li><br/>

Właściciele Sowiego Kątu życzą Państwu miłego pobytu.

</ol>
                        </div>
                        
                      <div className="footer-position-mobile" style={{ visibility: 'hidden' }}><FooterComponent /></div>
                    </div>
                </StyleRoot>
                <div className="footer-position"><FooterComponent /></div>
            </div>

        );
    }
}

export default HouseRegulations;