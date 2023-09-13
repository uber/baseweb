import * as React from 'react';
import {Dialog, SIZE} from 'baseui/dialog';
import {Button, KIND} from 'baseui/button';
import veniceJpg from './venice.jpg';

const BackgroundArtwork: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '200px',
      backgroundImage: `url(${veniceJpg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>
);

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Open
        </Button>
      </div>
      <Dialog
        artwork={BackgroundArtwork}
        heading="Heading"
        size={SIZE.medium}
        hasOverlay={true}
        isOpen={isOpen}
        handleDismiss={() => setIsOpen(false)}
        buttonDock={{
          primaryAction: <Button>Primary Action</Button>,
          dismissiveAction: (
            <Button
              onClick={() => setIsOpen(false)}
              kind={KIND.tertiary}
            >
              Dismiss
            </Button>
          ),
          secondaryActions: [
            <Button kind={KIND.secondary} key="first">
              Secondary Action
            </Button>,
          ],
        }}
      >
        <p>
          Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat
          facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Temporibus autem quibusdam et aut officiis
          debitis aut rerum necessitatibus saepe eveniet ut et
          voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut
          reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat.
        </p>
      </Dialog>
    </div>
  );
}
