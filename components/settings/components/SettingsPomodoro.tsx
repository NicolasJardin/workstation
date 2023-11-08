'use client'

import { FormActions } from '@/components/form'
import { usePomodoroContext } from '@/components/pomodoro'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSettingsContext } from '..'

const formSchema = z.object({
  flow: z.array(
    z.object({
      minutes: z.number(),
      position: z.number(),
      type: z.enum(['pomodoro', 'short-break', 'long-break'])
    })
  )
})

type PomodoroForm = z.infer<typeof formSchema>

export function SettingsPomodoro() {
  const { settings, updateSettings } = useSettingsContext()
  const { currentFlow, reset: resetPomodoro } = usePomodoroContext()

  const form = useForm<PomodoroForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flow: settings.flow.map(({ position, seconds, type }) => ({
        position,
        type,
        minutes: Math.floor(seconds / 60)
      }))
    }
  })

  const {
    formState: { isDirty },
    reset,
    handleSubmit,
    control
  } = form

  const onSubmit = useCallback(
    (data: PomodoroForm) => {
      const newFlow =
        data.flow.map(({ minutes, position, type }) => ({
          position,
          type,
          seconds: minutes * 60
        })) || []

      updateSettings({ flow: newFlow })

      reset(data)
      resetPomodoro(newFlow?.[0])
    },
    [updateSettings, reset, resetPomodoro]
  )

  return (
    <AccordionItem value="pomodoro">
      <AccordionTrigger>Pomodoro</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Configure o tempo de seu pomodoro</p>
              <p className="text-sm text-muted-foreground">
                Ao alterar as configurações o pomodoro sera reiniciado.
              </p>
            </div>
            <FormField
              control={control}
              name="flow"
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center justify-between">
                  <FormItem>
                    <FormLabel>Pomodoro</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={value.find(({ type }) => type === 'pomodoro')?.minutes}
                        onChange={event =>
                          onChange(
                            value.map(currentFlow => ({
                              ...currentFlow,
                              minutes:
                                currentFlow.type === 'pomodoro'
                                  ? Number(event.target.value)
                                  : currentFlow.minutes
                            }))
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Pausa curta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={value.find(({ type }) => type === 'short-break')?.minutes}
                        onChange={event =>
                          onChange(
                            value.map(currentFlow => ({
                              ...currentFlow,
                              minutes:
                                currentFlow.type === 'short-break'
                                  ? Number(event.target.value)
                                  : currentFlow.minutes
                            }))
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Pausa longa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={value.find(({ type }) => type === 'long-break')?.minutes}
                        onChange={event =>
                          onChange(
                            value.map(currentFlow => ({
                              ...currentFlow,
                              minutes:
                                currentFlow.type === 'long-break'
                                  ? Number(event.target.value)
                                  : currentFlow.minutes
                            }))
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormActions isVisible={isDirty} onDiscard={() => reset()} />
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  )
}
