// // @flow
// import {
//   StatefulInput as Input,
//   StyledInputContainer,
//   StyledInput,
//   StyledLabel,
// } from './index';

// const CustomInputContainer = withStyle(
//   StyledInputContainer,
//   ({$selectedColor}) => {
//     $selectedColor || 'white';
//   }
// );
// class MyComponent extends React.Component {
//   state = {
//     selectedColor: 'white',
//   };
//   changeColor = () => {
//     this.setState({
//       selectedColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
//     });
//   };
//   render() {
//     return (
//       <div>
//         <button onClick={this.changeColor}>Change Color</button>
//         <Input
//           $selectedColor={this.state.selectedColor}
//           $components={{InputContainer: CustomInputContainer}}
//           placeholder="Some placeholder"
//         />
//       </div>
//     );
//   }
// }
