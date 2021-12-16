import React, { Component } from 'react';

export class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populatePostsData();
    }
    static renderPostsCards(posts) {
        return (
            <div className='container'>
                <div className='row'>
                    {posts.map(category =>
                        <div className="mb-2 col-md-4 " key={category.id}>
                            <div className="card pt-3" >
                                <div className=''>
                                    <img className="card-img-top" src={category.imgSrc} alt={category.imgAlt} />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{category.title}</h5>
                                        <p className="card-text text-justify">{category.slogan}</p>
                                        <div className="form-row text-center">
                                            <div className="col-12 text-white">
                                                <a href={"/showOneCategory/" + category.urlSlug} className="btn btn-primary">Подробнее...</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Posts.renderPostsCards(this.state.posts);

        return (
            <div>
                <h1 id="tabelLabel" className='text-center'>Все Посты</h1>
                <p className='text-center'>Чтото там.....</p>
                {contents}
            </div>
        );
    }

    async populatePostsData() {                                     //методзапроса на сервер
        const response = await fetch('Post', {
            method: 'GET'
        });
        console.log(response);
        const data = await response.json();                             //ответ конвертим в json
        console.log(data);
        this.setState({ posts: data, loading: false });             //меняем состояние обьекта state - инитим forecasts массив данными с сервера
    }
}
