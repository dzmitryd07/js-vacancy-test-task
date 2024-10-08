import React from 'react';
import { Column, Img, Row, Section } from '@react-email/components';

const logoURL =
  'https://firebasestorage.googleapis.com/v0/b/test-vacancy-task.appspot.com/o/photos%2F6704f242bf6baf084f590463-1728377608598-shopy.png?alt=media&token=81a0c8bc-316e-4304-bdbd-eb5a3b3ecd75';

const Header = () => (
  <>
    <Row className="p-6">
      <Column align="center">
        <Img src={logoURL} alt="Ship" />
      </Column>
    </Row>

    <Section className="flex w-full">
      <Row>
        <Column className="border-b-0 border-solid border-gray-100 w-60" />
        <Column className="border-b-0 border-solid border-black w-32" />
        <Column className="border-b-0 border-solid border-gray-100 w-60" />
      </Row>
    </Section>
  </>
);

export default Header;
