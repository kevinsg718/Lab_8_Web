//Fuente consultada para evitar highlight https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting
//Fuente consultada https://codepen.io/fabiozinid/pen/BoOGPN
import React, { Component } from 'react';
import logo from './logo.svg';
import {Col} from 'reactstrap';

//fuentes consultadas https://www.npmjs.com/package/arrow-keys-react
//import ArrowKeysReact from 'arrow-keys-react';

import './App.css';
// agregar css a botones

const Boton = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingRight: 0, paddingBottom: 0 }}>
            <div className="Boton highlight"> { props.value } </div>
        </Col>
    )
}

const Botoncito = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingRight: 0, paddingBottom: 0 }}>
            <div className="botoncito"> { props.value } </div>
        </Col>
    )
}
const Botoncito_negro = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingRight: 0, paddingBottom: 0 }}>
            <div className="botoncito_negro"> { props.value } </div>
        </Col>
    )
}
const Botoncito_gigante = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingRight: 0, paddingBottom: 0 }}>
            <div className="botoncito_gigante highlight"> { props.value } </div>
        </Col>
    )
}

const Boton_special = (props) => {
    return (
        <Col onClick={ props.onClick } md="3" style={{ margin: 0, padding: 5, paddingBottom: 0 }}>
            <div className="Boton boton-special highlight"> { props.value } </div>
        </Col>
    )
}

class App extends Component {
  constructor(props) {
        super(props);

        this.state = {
            display: '0',
            numero_siguiente: '',
            Operacion_Actual: null,
            Ultima_Operacion: ''
        }
    }
//funcion para resetear el display
    Resetear() {
        this.setState({ display: '0', numero_siguiente: '', Operacion_Actual: null, Ultima_Operacion: '' });
    }
//Limitar tamano del numero    
    Tamano(numero) {
        return numero.length < 10 ? true : false;
    }
//limitar numero de digitos
    Digitos(numero) {
        return parseFloat(numero) > 999999999 ? true : false;
    }
//limitar el uso de negativos
    Negativos(numero) {
        return numero.includes('-') ? true : false;
    }
//funcion manejador de numeros
    Manejador(numerito) {
        if (this.state.Operacion_Actual !== '=') {
            if (!this.state.Operacion_Actual ) {
                var currentDisplay = this.state.display === '0' ? '' : this.state.display;
                var nuevo_numero = currentDisplay + numerito;
                nuevo_numero = nuevo_numero === '' ? '0' : nuevo_numero;
                var display = this.Tamano(nuevo_numero) ? nuevo_numero : this.state.display;
                display = this.Digitos(display) ? 'ERROR' : display;
                this.setState({ display, Operacion_Actual: null });
            } else if (this.state.Operacion_Actual) {
                this.setState({ numero_siguiente: this.state.display, display : numerito, Operacion_Actual: null, Ultima_Operacion: this.state.Operacion_Actual });
            } 
        } else {
            this.setState({ display: numerito, numero_siguiente: '', Operacion_Actual: null, Ultima_Operacion: '' });
        }     
    }
//funcion manejadora de operacion 
    Operaciones(Operacion_Actual) {
        if (this.state.Operacion_Actual === '=') {
            this.setState({ Operacion_Actual, Ultima_Operacion: '' });
        } else {
            if (!this.state.Operacion_Actual && this.state.Ultima_Operacion === '') {
                this.setState({ Operacion_Actual });
            } else if (this.state.Ultima_Operacion === '+') {
                var nuevo_numero = (parseFloat(this.state.display) + parseFloat(this.state.numero_siguiente)).toString();
                var display = this.Digitos(nuevo_numero) ? 'ERROR' : nuevo_numero;
                
                if (display !== 'ERROR') {
                    display = this.Tamano(display) ? display : display.substring(0, 8);
                    display = this.Negativos(display) ? 'ERROR' : display;
                }
                
                this.setState({ display, numero_siguiente: '', Operacion_Actual, Ultima_Operacion: '' });
            } else if (this.state.Ultima_Operacion === '-') {
                var nuevo_numero = (parseFloat(this.state.numero_siguiente) - parseFloat(this.state.display)).toString();
                var display = this.Digitos(nuevo_numero) ? 'ERROR' : nuevo_numero;
                
                if (display !== 'ERROR') {
                    display = this.Tamano(display) ? display : display.substring(0, 8);
                    display = this.Negativos(display) ? 'ERROR' : display;
                }
                
                this.setState({ display, numero_siguiente: '', Operacion_Actual, Ultima_Operacion: '' });
            } else if (this.state.Ultima_Operacion === 'X') {
                var nuevo_numero = (parseFloat(this.state.numero_siguiente) * parseFloat(this.state.display)).toString();
                var display = this.Digitos(nuevo_numero) ? 'ERROR' : nuevo_numero;
                
                if (display !== 'ERROR') {
                    display = this.Tamano(display) ? display : display.substring(0, 8);
                    display = this.Negativos(display) ? 'ERROR' : display;
                }
                
                this.setState({ display, numero_siguiente: '', Operacion_Actual, Ultima_Operacion: '' });
            } else if (this.state.Ultima_Operacion === '/') {
                var nuevo_numero = (parseFloat(this.state.numero_siguiente) / parseFloat(this.state.display)).toString();
                var display = this.Digitos(nuevo_numero) ? 'ERROR' : nuevo_numero;
                
                if (display !== 'ERROR') {
                    display = this.Tamano(display) ? display : display.substring(0, 8);
                    display = this.Negativos(display) ? 'ERROR' : display;
                }
                
                this.setState({ display, numero_siguiente: '', Operacion_Actual, Ultima_Operacion: '' });
            } else if (this.state.Ultima_Operacion === 'mod') {
                var nuevo_numero = (parseFloat(this.state.numero_siguiente) % parseFloat(this.state.display)).toString();
                var display = this.Digitos(nuevo_numero) ? 'ERROR' : nuevo_numero;
                
                if (display !== 'ERROR') {
                    display = this.Tamano(display) ? display : display.substring(0, 8);
                    display = this.Negativos(display) ? 'ERROR' : display;
                }
                
                this.setState({ display, numero_siguiente: '', Operacion_Actual, Ultima_Operacion: '' });
            }
        }        
    }
//pantalla
  render() {
    return (
           <div className="App-header">
           <h4>Lab_Web_calculadora</h4>
           <div className="wrapper">
           <div className="Titulo_ventana">
                <div className="Titulo_casio">Casio</div>
                <div className="ventana">aaaaaaaaa</div>
                <div className="Titulo_Fx">Fx-82Ms</div>
           </div>
           <div className="Titulo_SVPAM">S.V.P.A.M</div>
           <div className="display"> { this.state.display } </div>
            <div className="Layer_botones_falsos">
            <div className="Layer_columnas">
            <Botoncito  value=''/>
            <Botoncito_negro  value='x^2'/>
            <Botoncito_negro  value='ab/c'/>
            <Botoncito_negro  value='(-)'/>
            <Botoncito_negro  value='RCL'/>
            </div>
            <div className="Layer_espacio"></div>
            <div className="Layer_columnas">
            <Botoncito  value=''/>
            <Botoncito_negro  value='nCr'/>
            <Botoncito_negro  value='sqrt'/>
            <Botoncito_negro  value='.,,,'/>
            <Botoncito_negro  value='ENG'/>
            </div>
            <div className="Layer_espacio"></div>
            <div className="Layer_columnas">
            <Botoncito_gigante  onClick={ () => this.Manejador('mod') } value='Mod'/>
            <Botoncito_negro  value='x^2'/>
            <Botoncito_negro  value='^'/>
            <Botoncito_negro  value='hip'/>
            <Botoncito_negro  value='sin'/>
            <Botoncito_negro  value='('/>
            <Botoncito_negro  value=')'/>
            </div>
            <div className="Layer_columnas">
            <Botoncito  value=''/>
            <Botoncito_negro  value='Pol'/>
            <Botoncito_negro  value='Log'/>
            <Botoncito_negro  value='Cos'/>
            <Botoncito_negro  value=','/>
            </div>
            <div className="Layer_espacio"></div>
            <div className="Layer_columnas">
            <Botoncito  value=''/>
            <Botoncito_negro  value='x^3'/>
            <Botoncito_negro  value='ln'/>
            <Botoncito_negro  value='Tan'/>
            <Botoncito_negro  value='M+'/>
            </div>

            </div>
           <div className="Layer_botones">
                <div className="Layer_columnas">
                <Boton onClick={ () => this.Manejador('7') } value='7'/>
                <Boton onClick={ () => this.Manejador('4') } value='4'/>
                <Boton onClick={ () => this.Manejador('1') } value='1'/>
                <Boton onClick={ () => this.Manejador('0') } value='0'/>
                </div>
                
                <div className="Layer_columnas">
                <Boton onClick={ () => this.Manejador('8') } value='8'/>
                <Boton onClick={ () => this.Manejador('5') } value='5'/>
                <Boton onClick={ () => this.Manejador('2') } value='2'/>
                <Boton onClick={ () => this.Manejador('.') } value='.'/>

                </div>
                
                <div className="Layer_columnas">
                <Boton onClick={ () => this.Manejador('9') } value='9'/>
                <Boton onClick={ () => this.Manejador('6') } value='6'/>
                <Boton onClick={ () => this.Manejador('3') } value='3'/>
                <Boton onClick={ () => this.Manejador('3') } value='EXP'/>
                </div>
                
                 <div className="Layer_columnas">
                <Boton_special onClick={ () => this.Resetear() } value='DEL'/>
                <Boton onClick={ () => this.Operaciones('X') } value='*'/>  
                <Boton onClick={ () => this.Operaciones('+') } value='+'/> 
                <Boton onClick={ () => this.Operaciones('=') } value='Ans'/> 
                </div>
                
                 <div className="Layer_columnas">
                <Boton_special onClick={ () => this.Resetear() } value='AC'/>
                <Boton onClick={ () => this.Operaciones('/') } value='/'/>  
                <Boton onClick={ () => this.Operaciones('-') } value='-'/> 
                <Boton onClick={ () => this.Operaciones('=') } value='='/> 
                </div>
           </div>
           </div>



           </div>
        );
  }
}

export default App;
