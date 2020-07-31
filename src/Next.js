import React, { Component } from 'react';

export default class Next extends Component {
    render(){

        let nextBoard = this.props.next.map((i, key)=>{
            let el = null;

            switch (i) {
				case 'O':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'--O'}/>
										<td className={'--O'}/>
									</tr>
									<tr>
										<td className={'--O'}/>
										<td className={'--O'}/>
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'I':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'--I'} />
									</tr>
									<tr>
										<td className={'--I'} />
									</tr>
									<tr>
										<td className={'--I'} />
									</tr>
									<tr>
										<td className={'--I'} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'T':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'--T'} />
									</tr>
									<tr>
										<td className={'--T'} />
										<td className={'--T'} />
									</tr>
									<tr>
										<td className={'--T'} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'Z':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'--Z'} />
										<td className={'--Z'} />
										<td style={{ visibility: 'hidden' }} />
									</tr>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'--Z'} />
										<td className={'--Z'} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'S':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'--S'} />
										<td className={'--S'} />
									</tr>
									<tr>
										<td className={'--S'} />
										<td className={'--S'} />
										<td style={{ visibility: 'hidden' }} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'L':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'--L'} />
									</tr>
									<tr>
										<td className={'--L'} />
									</tr>
									<tr>
										<td className={'--L'} />
										<td className={'--L'} />
									</tr>
								</tbody>
							</table>
						</div>
					);

					break;
				case 'J':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'--J'} />
									</tr>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'--J'} />
									</tr>
									<tr>
										<td className={'--J'} />
										<td className={'--J'} />
									</tr>
								</tbody>
							</table>
						</div>
					);

					break;

				case 'D':
					el = (
						<div className={'__nextElem'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'--D'} />
									</tr>
								</tbody>
							</table>
						</div>
					);

					break;

				default:
					console.log('sth gone wrong');
            }
            
            return el;
        })


        return <div className={'Next'}>{!this.props.gameOver ? nextBoard : null}</div>;
    }
}