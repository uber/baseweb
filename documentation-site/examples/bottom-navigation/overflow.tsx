import * as React from "react";
import { styled } from "baseui/styles";
import { BottomNavigation, NavItem } from "baseui/bottom-navigation";
import { MessageCard } from "baseui/message-card";
import { FileUploaderBasic } from "baseui/file-uploader-basic";
import { colors } from "baseui/tokens";
import Calendar from "baseui/icon/calendar";
import Alert from "baseui/icon/alert";
import ChevronRight from "baseui/icon/chevron-right";
import Show from "baseui/icon/show";
import Search from "baseui/icon/search";
import Upload from "baseui/icon/upload";
import deliveryHeroItalianSvg from "./images/deliveryHeroItalian.svg";
import deliveryLargeStrawberriesSvg from "./images/deliveryLargeStrawberries.svg";
import earnerLargeRiderDriverSvg from "./images/earnerLargeRiderDriver.svg";

export const TextContent = ({ numParagraphs, children }) => {
  const Paragraph = () => (
    <p>
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
      amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
    </p>
  );

  const paragraphs =
    numParagraphs > 0 ? Array(numParagraphs).fill(Paragraph) : [];

  return (
    <div style={{ padding: "10px" }}>
      {children}
      {paragraphs.map((Paragraph, idx) => (
        <Paragraph key={idx} />
      ))}
    </div>
  );
};

const StyledIphone6 = styled("div", {
  width: "375px",
  height: "667px",
  border: "1px solid #ECECEC",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
});

export default function Example() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(0);

  return (
    <StyledIphone6>
      <BottomNavigation
        activeKey={activeKey}
        onChange={({ activeKey }) => setActiveKey(activeKey)}
      >
        <NavItem title="Search" icon={Search}>
          <TextContent numParagraphs={8}>
            <h1>Search content</h1>
          </TextContent>
        </NavItem>

        <NavItem title="Food" icon={Show}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <MessageCard
              heading="Heading"
              paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
              buttonLabel="Save now"
              image={{
                src: deliveryHeroItalianSvg,
                ariaLabel:
                  "Illustration of an Italian meal with pizza and pasta on a picnic table",
              }}
              onClick={() => console.log("Saved")}
              backgroundColor={colors.red200}
            />
            <MessageCard
              paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
              buttonLabel="Save now"
              image={{
                src: deliveryLargeStrawberriesSvg,
                ariaLabel: "Illustration of strawberries",
              }}
              onClick={() => console.log("Saved")}
            />
            <MessageCard
              heading="Heading"
              paragraph="ipsum lorem dopem topo logic hippos bananas and the rest"
              image={{
                src: earnerLargeRiderDriverSvg,
                ariaLabel:
                  "A car with a driver and a passenger both wearing masks",
              }}
              onClick={() => console.log("Saved")}
              backgroundColor={colors.blue300}
            />
          </div>
        </NavItem>

        <NavItem title="Schedule" icon={Calendar}>
          <TextContent numParagraphs={3}>
            <h1>Schedule content</h1>
          </TextContent>
        </NavItem>

        <NavItem title="Attention" icon={Alert}>
          <TextContent numParagraphs={2}>
            <h1>Attention content</h1>
          </TextContent>
        </NavItem>

        <NavItem title="Transit" icon={ChevronRight}>
          <TextContent numParagraphs={3}>
            <h1>Transit content</h1>
          </TextContent>
        </NavItem>

        <NavItem title="Upload" icon={Upload}>
          <TextContent numParagraphs={0}>
            <h1>File Upload</h1>
            <FileUploaderBasic errorMessage={""} />
          </TextContent>
        </NavItem>
      </BottomNavigation>
    </StyledIphone6>
  );
}
