import React, {Component} from 'react';
import "./css/Characters.css";
import Drawer from './Drawer.jsx';
class Characters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            selectedCharacter: {}
        }
    }

    openNav = (character) => {
        this.setState({selectedCharacter: character})
        document.getElementById("mySidenav").style.width = "70vh";
    }


    componentWillMount() {
        fetch("http://gateway.marvel.com/v1/public/characters?ts=1509919620472&apikey=b1a65b4d878c2f7a79f9bb3873d98d9a&hash=2295cd61b369a99f20eccd5d933d858e&offset=100&limit=100")
            .then(res => res.json())
            .then((data) => {
                const results = data.data.results;
                const characters = results.map(r => {
                    if (!r.thumbnail.path.includes('image_not_available'))
                        return {img: r.thumbnail.path, ext: r.thumbnail.extension, name: r.name, description: r.description}
                    else
                        return null;
                }).filter(r => r);

                this.setState({characters})
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="bar"><h1>Characters</h1></div>
                <div className="characters" style={getStyleContainer(this.state.characters.length)}>
                    {this.state.characters.map((character, i) => {
                        return (
                            <div onClick={()=>this.openNav(character)} className={"item " + getClass(i)} style={getStyle(i)} key={i}>
                                <img src={getURL(i, character.img, character.ext)}/>
                                <div className="title"><b>{character.name}</b></div>
                            </div>
                        )
                    })}

                </div>
                <Drawer character={this.state.selectedCharacter}/>
            </div>
        );
    }
}

const getClass = (i) => {
    switch (i % 10) {
        case 0:
            return 'ancho';
        case 1:
            return 'cuadro';
        case 2:
            return 'alto';
        case 3:
            return 'cuadro';
        case 4:
            return 'alto';
        case 5:
            return 'ancho';
        case 6:
            return 'cuadro';
        case 7:
            return 'cuadro';
        case 8:
            return 'cuadro';
        case 9:
            return 'ancho';
        default:
            return '';
    }
}

const getStyle = (i) => {
    switch (i % 10) {
        case 0:
            return {gridColumn: '1/3'};
        case 1:
            return {gridColumn: '3/4'};
        case 2:
            return {gridRow: (Math.floor(i / 10) * 3 + 1) + '/' + (Math.floor(i / 10) * 3 + 3), gridColumn: '4/5'};
        case 3:
            return {gridColumn: '5/6', maxHeight: '200px', maxWidth: '200px'};
        case 4:
            return {gridRow: (Math.floor(i / 10) * 3 + 2) + '/' + (Math.floor(i / 10) * 3 + 4), gridColumn: '1/2'};
        case 5:
            return {gridColumn: '2/4'};
        case 6:
            return {gridColumn: '5/6'};
        case 7:
            return {gridColumn: '2/3'};
        case 8:
            return {gridColumn: '3/4'};
        case 9:
            return {gridColumn: '4/6'};
        default:
            return '';
    }
};

const getURL = (i, path, ext) => {
    switch (i % 10) {
        case 0:
            return path + '/landscape_incredible.' + ext;
        case 1:
            return path + '/standard_xlarge.' + ext;
        case 2:
            return path + '/portrait_uncanny.' + ext;
        case 3:
            return path + '/standard_xlarge.' + ext;
        case 4:
            return path + '/portrait_uncanny.' + ext;
        case 5:
            return path + '/landscape_incredible.' + ext;
        case 6:
            return path + '/standard_xlarge.' + ext;
        case 7:
            return path + '/standard_xlarge.' + ext;
        case 8:
            return path + '/standard_xlarge.' + ext;
        case 9:
            return path + '/landscape_incredible.' + ext;
        default :
            return path + '/landscape_incredible.' + ext;
    }
}

const getStyleContainer = (size) => {
    const t = (Math.floor(size / 10)) * 3;
    let cadena = '';
    for (let i = 0; i <= t; i++) {
        cadena += '200px '
    }
    return {gridTemplateColumns: '200px 200px 200px 200px 200px', gridTemplateRows: cadena}
};
// const pattern = [2,1,3,2,1,1];
export default Characters;