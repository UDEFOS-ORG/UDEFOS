import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import type { Question } from '@/types/learning';

interface QuestionChoicesProps {
  question: Question;
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export default function QuestionChoices({ question, selected, onSelect, disabled = false }: QuestionChoicesProps) {
  const labelId = `${question.id}-label`;

  return (
    <FormControl component="fieldset" disabled={disabled} sx={{ width: '100%' }}>
      {question.scenario && (
        <Typography
          variant="body2"
          sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: 'grey.50', border: 1, borderColor: 'divider', color: 'text.primary' }}
        >
          {question.scenario}
        </Typography>
      )}
      <FormLabel id={labelId} sx={{ color: 'text.primary', fontWeight: 600, mb: 1, '&.Mui-disabled': { color: 'text.primary' } }}>
        {question.prompt}
      </FormLabel>
      <RadioGroup
        aria-labelledby={labelId}
        value={selected === null ? '' : String(selected)}
        onChange={(event) => onSelect(Number(event.target.value))}
      >
        {question.options.map((option, index) => (
          <FormControlLabel
            key={option}
            value={String(index)}
            control={<Radio size="small" />}
            label={option}
            sx={{
              mx: 0,
              mb: 0.5,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              border: 1,
              borderColor: selected === index ? 'primary.main' : 'divider',
              bgcolor: selected === index ? 'rgba(20, 86, 163, 0.06)' : 'transparent',
              transition: 'background-color 150ms ease, border-color 150ms ease',
              '&:hover': { bgcolor: 'rgba(20, 86, 163, 0.04)' },
              '& .MuiFormControlLabel-label': { color: 'text.primary' },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
