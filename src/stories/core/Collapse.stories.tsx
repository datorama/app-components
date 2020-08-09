import React from "react";

// Components
import Collapse, { CollapseProps } from 'packages/core/Collapse/Collapse';

export const Default = (props: CollapseProps) => {
  return (
		<Collapse label="collapse label" {...props}>
			<div style={{
        fontSize: 12,
        lineHeight: '24px'
      }}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Aliquam aspernatur consectetur culpa eius enim et,
				facere iure labore magnam necessitatibus
				nisi quibusdam quisquam quo recusandae reprehenderit
				ullam veritatis voluptatem voluptatum.
			</div>
		</Collapse>
  );
};

export default {
  title: "Core/Collapse",
  component: Collapse,
};
