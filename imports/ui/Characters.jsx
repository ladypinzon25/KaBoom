import React, {Component} from 'react';
import "./css/Characters.css";
class Characters extends Component {

    constructor(props){
        super(props);
        this.state = {
            characters: [],
        }
    }


    componentWillMount() {
        fetch("http://gateway.marvel.com/v1/public/characters?ts=1509919620472&apikey=b1a65b4d878c2f7a79f9bb3873d98d9a&hash=2295cd61b369a99f20eccd5d933d858e&offset=0&limit=8")
            .then(res => res.json())
            .then( (data) =>{
                const results = data.data.results;
                const characters = results.map(r => {
                    if(!r.thumbnail.path.includes('image_not_available'))
                        return {img: r.thumbnail.path, ext:r.thumbnail.extension}
                    else
                        return null;
                }).filter(r => r);

                this.setState({ characters})
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="bar"><h1>Characters</h1></div>
                <div className="characters">
                    {
                        this.state.text
                    }
                    {this.state.characters.map((character,i) => {
                        return (
                            <div className={"item "+getClass(i)} key={i}>
                                <img src={getURL(i,character.img, character.ext)}/>
                            </div>
                        )
                    })}

                </div>
            </div>
        );
    }
}

const getClass = (i)=>{
    switch (i%6){
        case 0: return 'item1';
        case 1: return 'item2';
        case 2: return 'item3';
        case 3: return 'item4';
        case 4: return 'item5';
        case 5: return 'item2';
        default : return '';
    }
}

const getURL = (i,path,ext)=>{
    switch (i%6){
        case 0: return path+'/landscape_incredible.'+ext;
        case 1: return path+'/standard_xlarge.'+ext;
        case 2: return path+'/portrait_uncanny.'+ext;
        case 3: return path+'/landscape_incredible.'+ext;
        case 4: return path+'/standard_xlarge.'+ext;
        case 5: return path+'/standard_xlarge.'+ext;
        default : return path+'/standard_xlarge.'+ext;
    }
}
// const pattern = [2,1,3,2,1,1];
export default Characters;