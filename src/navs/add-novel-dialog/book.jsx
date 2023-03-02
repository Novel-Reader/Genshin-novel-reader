import React from 'react';
import { Button } from 'reactstrap';

export default function Book(props) {
  const { novel } = props;
  const { author, brief, cover_photo, id, name, price } = novel
  return (
    <tr key={id} className="book">
      <td scope="row">
        {name.slice(0, name.indexOf('.'))}
      </td>
      <th >
        {author}
      </th>
      <td>
        {price}
      </td>
      <td className="book-brief">
        {brief}
      </td>
      <td>
        <Button color="primary" onClick={() => {props.onClick(id)}} size="sm">下载</Button>
      </td>
    </tr>
  )
}
