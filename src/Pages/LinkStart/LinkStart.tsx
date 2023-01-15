import React from "react";
import { Cube } from '../../Components';
import styles from './LinkStart.module.css';

export const LinkStart: React.FC = () => {
	return (
		<>
			<div className={styles.panel}>
				{/* top-left */}
				<Cube top={"-25"} left={"-25"} persX={"200"} persY={"200"} color={"green"} />
				<Cube top={"-25"} left={"-25"} persX={"200"} persY={"200"} color={"yellow"} delay={0.3} />
				{/* <Cube top={"-25"} left={"-25"} persX={"200"} persY={"200"} color={"grey"} delay={1} /> */}
				
				{/* top-middle */}
				<Cube top={"-25"} left={"75"} persX={"50"} persY={"200"} color={"purple"} />
				<Cube top={"-25"} left={"75"} persX={"50"} persY={"200"} color={"green"} delay={0.5} />
				
				{/* top-right */}
				<Cube top={'-25'} left={'175'} persX={"-100"} persY={"200"} color={'black'} />
				<Cube top={'-25'} left={'175'} persX={"-100"} persY={"200"} color={'yellow'} delay={0.7} />

				{/* top-right-middle */}
				<Cube top={'75'} left={'175'} persX={"-100"} persY={"60"} color={'red'} />
				<Cube top={'75'} left={'175'} persX={"-100"} persY={"60"} color={'purple'} delay={0.9} />
				
				{/* bottom-right */}
				<Cube top={"175"} left={"175"} persX={"-100"} persY={"-100"} color={"yellow"} />
				<Cube top={"175"} left={"175"} persX={"-100"} persY={"-100"} color={"red"} delay={1.1} />
				
				{/* bottom-middle */}
				<Cube top={"175"} left={"75"} persX={"50"} persY={"-100"} color={"grey"} />
				<Cube top={"175"} left={"75"} persX={"50"} persY={"-100"} color={"purple"} delay={0.2} />
				
				{/* left-middle */}
				<Cube top={'75'} left={'-25'} persX={'200'} persY={'50'} color={'yellow'} />
				<Cube top={'75'} left={'-25'} persX={'200'} persY={'50'} color={'green'} delay={0.6} />

				{/* bottom-left */}
				<Cube top={'175'} left={'-25'} persX={'200'} persY={'-100'} color={'red'} />
				<Cube top={'175'} left={'-25'} persX={'200'} persY={'-100'} color={'green'} delay={1.0} />
			</div>
		</>
	)
}