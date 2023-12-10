'use client'

import { FormActions } from '@/components/form'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Volume2 } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import useSound from 'use-sound'
import { z } from 'zod'
import { useSettingsContext } from '..'

const schema = z.object({
  src: z.string(),
  volume: z.number()
})

type AudioForm = z.infer<typeof schema>

export function SettingsAudio() {
  const { settings, updateSettings } = useSettingsContext()

  const form = useForm<AudioForm>({
    defaultValues: {
      src: settings.audio.src,
      volume: settings.audio.volume
    }
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
    watch
  } = form

  const { src, volume } = watch()

  const filesOptions = [
    {
      value: 'trumpets',
      label: 'Trombetas'
    },
    {
      value: 'success',
      label: 'Sucesso'
    },
    {
      value: 'double-bips',
      label: 'Bips duplos'
    },
    {
      value: 'called',
      label: 'Chamado'
    },
    {
      value: 'smooth',
      label: 'Suave'
    }
  ]

  const onSubmit = useCallback(
    (audio: AudioForm) => {
      updateSettings({
        audio
      })

      reset(audio)
    },
    [updateSettings, reset]
  )

  const [playSound] = useSound(`/sounds/${src}.mp3`, {
    volume
  })

  return (
    <AccordionItem value="audio">
      <AccordionTrigger>Audio</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="src"
              render={({ field: { value, onChange } }) => (
                <FormItem className="max-w-xs">
                  <FormLabel>Efeito sonoro</FormLabel>
                  <div className="flex items-center gap-4">
                    <Select
                      value={value}
                      onValueChange={value => {
                        onChange(value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o efeito sonoro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filesOptions.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={() => playSound()} type="button">
                      <Volume2 />
                    </Button>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="volume"
              render={({ field: { value, onChange } }) => (
                <FormItem className="max-w-[40%]">
                  <FormLabel>Volume dos efeitos sonoros</FormLabel>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    defaultValue={[value]}
                    onValueChange={onChange}
                  />
                </FormItem>
              )}
            />

            <FormActions isVisible={isDirty} onDiscard={() => reset()} />
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  )
}
