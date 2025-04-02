import React from 'react';

import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { Box } from './ui/box';

type policy = {
  id: string;
  name: string;
  description: string;
};

export default function Policycard(props: policy) {
  return (
    <Box className=" bg-primary-300" >
    <Card size="md" variant="elevated" className="m-3">
      <Heading size="md" className="mb-1">
       {props.id}
      </Heading>
      <Text size="sm">{props.name}</Text>
    </Card>
    </Box>
  );
}
