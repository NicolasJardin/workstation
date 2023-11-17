'use client'

import { FormActions } from '@/components/form'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSettingsContext } from '..'

const schema = z.object({
  theme: z.enum(['light', 'dark']),
  background: z.enum([
    'rain',
    'banff',
    'fall',
    'forest',
    'night',
    'northernLights',
    'rain',
    'tokyo'
  ])
})

type AppearanceForm = z.infer<typeof schema>

export function SettingsAppearance() {
  const { settings, updateSettings } = useSettingsContext()

  const form = useForm<AppearanceForm>({
    defaultValues: {
      background: settings.appearance.background,
      theme: settings.appearance.theme
    }
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty }
  } = form

  const backgroundOptions: { value: AppearanceForm['background']; label: string }[] = [
    {
      value: 'banff',
      label: 'Banff'
    },
    {
      value: 'fall',
      label: 'Outono'
    },
    {
      value: 'forest',
      label: 'Floresta'
    },
    {
      value: 'night',
      label: 'Noite'
    },
    {
      value: 'northernLights',
      label: 'Aurora boreal'
    },
    {
      value: 'rain',
      label: 'Chuva'
    },
    {
      value: 'tokyo',
      label: 'Tokyo'
    }
  ]

  const onSubmit = useCallback(
    (appearance: AppearanceForm) => {
      updateSettings({
        appearance
      })

      reset(appearance)
    },
    [updateSettings, reset]
  )

  return (
    <AccordionItem value="appearance">
      <AccordionTrigger>Aparência</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="theme"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormLabel>Tema escuro</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value === 'dark'}
                        onCheckedChange={() => onChange(value === 'light' ? 'dark' : 'light')}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="background"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Plano de fundo</FormLabel>
                  <Select value={value} onValueChange={onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o plano de fundo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {backgroundOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
