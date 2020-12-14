import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from 'baseui/modal';

export default function Example() {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(s => !s)}>Open Modal</Button>
      <Modal
        onClose={() => setOpen(false)}
        isOpen={isOpen}
        unstable_ModalBackdropScroll
      >
        <FocusOnce>
          <ModalHeader>Some Header</ModalHeader>
        </FocusOnce>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas quam nisl, tempor ut varius sit amet, sodales
            sit amet mauris. Aliquam vitae sapien quis eros finibus
            aliquet. Fusce et quam lobortis, viverra eros eget,
            finibus leo. Integer elementum lacus et lorem suscipit
            tincidunt. Proin malesuada turpis id mi placerat maximus
            a et diam. Sed elementum cursus metus, in imperdiet
            sapien commodo non. Pellentesque ultricies lorem nulla,
            a finibus eros fermentum viverra. Cras nulla lacus,
            porttitor quis euismod sed, varius sit amet magna. Ut
            aliquam odio sed ultricies eleifend. Etiam quis velit
            odio. Aenean fermentum dolor sit amet pellentesque
            facilisis. Aliquam porta in risus nec faucibus.
          </p>
          <p>
            Proin rhoncus pharetra purus. Aliquam sapien est,
            ultrices vitae velit ac, dictum volutpat sem. Morbi
            blandit venenatis volutpat. Sed finibus bibendum justo
            faucibus tempor. Nunc commodo condimentum magna et
            auctor. Nunc consequat turpis eget rutrum aliquet.
            Mauris fringilla libero non urna volutpat lacinia. Sed
            facilisis finibus lobortis. Etiam ipsum erat, euismod
            eget purus id, dignissim faucibus velit. Fusce rutrum
            urna felis, consequat ullamcorper dolor porttitor vitae.
            Nulla non velit eget urna congue congue ac vitae lorem.
            Sed ac lorem eu justo consectetur varius placerat sit
            amet enim. Curabitur eu placerat augue, ut porttitor
            quam. Vivamus vitae elit eu nisl rutrum sodales ut eu
            nisl. Praesent elementum orci sed metus vulputate
            blandit.
          </p>
          <p>
            In vel condimentum quam, eget dignissim velit.
            Pellentesque volutpat urna in eros tempor, vestibulum
            accumsan enim suscipit. Morbi condimentum placerat
            dolor, et ultrices elit accumsan quis. Nam laoreet
            auctor felis at lobortis. Nulla fringilla, elit ut
            sollicitudin fermentum, velit metus porta massa, nec
            pharetra justo leo a purus. Duis pharetra est interdum
            neque viverra, eget ultrices dui efficitur. In sed orci
            dolor. In hac habitasse platea dictumst. Proin aliquam
            facilisis eros, a mollis ante consequat vitae. Fusce
            quis viverra est. Sed tristique accumsan magna, vel
            dictum lectus posuere at. Suspendisse at scelerisque
            diam.
          </p>
          <p>
            Donec sem ante, pulvinar ac turpis laoreet, euismod
            semper massa. Donec finibus fringilla augue, ac suscipit
            diam placerat eget. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam pulvinar ultricies est,
            ut laoreet tortor pulvinar pretium. Nam imperdiet
            feugiat sodales. Sed posuere nisi vel ex euismod, in
            tristique metus sodales. Duis laoreet quam at molestie
            euismod. Nulla tempus sagittis tortor ac porttitor.
            Proin suscipit pharetra eros vitae rutrum.
          </p>
          <p>
            Etiam eu orci faucibus, molestie turpis sed, feugiat
            eros. Aliquam quis orci eget tellus convallis cursus eu
            non ante. Praesent et sagittis odio, nec mollis metus.
            Mauris suscipit sapien eu nulla vehicula mollis. Integer
            sapien ex, consequat vel ornare mollis, laoreet
            hendrerit tortor. Vestibulum a lacus vel nisl volutpat
            mattis. Vivamus tincidunt gravida risus a viverra.
            Maecenas varius ligula ac blandit tempus. Nulla
            facilisi. Fusce blandit, purus in malesuada blandit,
            enim velit pretium est, vel faucibus nisl dui blandit
            felis. Nullam sit amet dapibus sapien, bibendum suscipit
            orci. Suspendisse gravida mauris justo, pulvinar
            condimentum augue egestas eu. Etiam dictum felis eros,
            sed dapibus orci malesuada sed.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={() => setOpen(false)}>
            Okay
          </ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
