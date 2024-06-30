import { Edit, TextInput, SimpleForm, required, ReferenceInput, NumberInput, SelectInput } from 'react-admin';

export const ChallengeEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput
					source='question'
					validate={[required()]}
					label='Question'
				/>
				<SelectInput
					validate={[required()]}
					source='type'
					choices={[
						{ id: 'SELECT', name: 'SELECT' },
						{ id: 'ASSIST', name: 'ASSIST' },
					]}
				/>
				<ReferenceInput
					source='lessonId'
					reference='lessons'
				/>
				<NumberInput
					source='order'
					validate={[required()]}
					label='Order'
				/>
			</SimpleForm>
		</Edit>
	);
};
