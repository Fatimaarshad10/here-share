import React from 'react';

function Articles({data}) {
 
    return (
        <div className="card w-50 mx-auto">
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Upvotes</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                  {data.map((data)=>{
                    return <tr data-testid="article"  key={data.id}>
                    <td data-testid="article-title">{data.title}</td>
                    <td data-testid="article-upvotes">{data.upvotes}</td>
                    <td data-testid="article-date">{data.date}</td>
                </tr>
                  })}
                
                </tbody>
            </table>
        </div>
    );

}

export default Articles;
