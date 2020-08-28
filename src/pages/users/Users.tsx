import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const pageInfo = {
        curPage: 1,
        totalPages: [],
    }
    const [pagesInfo, setPagesInfo] = useState<any>(pageInfo);

    useEffect(() => {
        api.get('/users', {
            params: {
                page: pagesInfo.curPage,
            }
        }).then((value) => {
            const pageData = value.data;
            let pagesArr = [];
            for (let index = 0; index < pageData.total_pages; index++) {
                pagesArr.push(index);
            }
            setPagesInfo({
                curPage: pageData.page,
                totalPages: pagesArr
            })
            console.log(pageData);
            setUsers(pageData.data);
        }).catch(error => {
            console.log(error);
        });
    }, [pagesInfo.curPage]);

    function changePage(e: any) {
        const { value } = e.target;
        console.log(value);
        setPagesInfo({
            curPage: value,
            totalPages: pagesInfo.totalPages
        });
    }

    return (
        <div>
            {users.length === 0 && (<h2>Carregando</h2>)}
            <ul>
            {users.map((user, index) => {
                return (
                    <li className="userLi" key={user.id}>
                        <img src={ user.avatar } alt={ user.email }></img>
                        <div>Email: { user.email } <br></br>Name: {user.first_name} {user.last_name}</div>
                    </li>
                );
            })}
            </ul>
            { pagesInfo.totalPages.length === 0 && (<></>) }
            {pagesInfo.totalPages.map((page: number, index: number) => {
                return (
                    <button onClick={changePage} value={page+1} key={page} disabled={ (page+1 === pagesInfo.curPage ? true : false) }>{ index+1 }</button>
                );
            })}
        </div>
    );
}

export default Users;