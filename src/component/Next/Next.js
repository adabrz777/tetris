import React, { Component } from 'react';
import './index.css';

export default class Next extends Component {
    render(){

        let nextBoard = this.props.next.map((i, key)=>{
            let el = null;

            switch (i) {
				case 'O':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'Next__cell Next__cell--O'}/>
										<td className={'Next__cell Next__cell--O'}/>
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--O'}/>
										<td className={'Next__cell Next__cell--O'}/>
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'I':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'Next__cell Next__cell--I'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--I'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--I'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--I'} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'T':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'Next__cell Next__cell--T'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--T'} />
										<td className={'Next__cell Next__cell--T'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--T'} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'Z':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'Next__cell Next__cell--Z'} />
										<td className={'Next__cell Next__cell--Z'} />
										<td style={{ visibility: 'hidden' }} />
									</tr>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'Next__cell Next__cell--Z'} />
										<td className={'Next__cell Next__cell--Z'} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'S':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'Next__cell Next__cell--S'} />
										<td className={'Next__cell Next__cell--S'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--S'} />
										<td className={'Next__cell Next__cell--S'} />
										<td style={{ visibility: 'hidden' }} />
									</tr>
								</tbody>
							</table>
						</div>
					);
					break;
				case 'L':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'Next__cell Next__cell--L'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--L'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--L'} />
										<td className={'Next__cell Next__cell--L'} />
									</tr>
								</tbody>
							</table>
						</div>
					);

					break;
				case 'J':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'Next__cell Next__cell--J'} />
									</tr>
									<tr>
										<td style={{ visibility: 'hidden' }} />
										<td className={'Next__cell Next__cell--J'} />
									</tr>
									<tr>
										<td className={'Next__cell Next__cell--J'} />
										<td className={'Next__cell Next__cell--J'} />
									</tr>
								</tbody>
							</table>
						</div>
					);

					break;

				case 'D':
					el = (
						<div className={'Next__next-element'} key={key}>
							<table>
								<tbody>
									<tr>
										<td className={'Next__cell Next__cell--D'} />
									</tr>
								</tbody>
							</table>
						</div>
					);

					break;

				default:
					console.error('Wrong element type');
            }
            
            return el;
        })


        return <div className={'Next'}>{!this.props.gameOver ? nextBoard : null}</div>;
    }
}