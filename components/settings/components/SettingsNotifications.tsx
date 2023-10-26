'use client'

import { Fade } from '@/components/animation'
import { FormActions } from '@/components/form'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSettingsContext } from '..'
import { NotificationsModeEnum } from '../enums'

const formSchema = z.object({
  mode: z.nativeEnum(NotificationsModeEnum),
  permissions: z
    .object({
      sound: z.boolean(),
      toast: z.boolean()
    })
    .optional()
})

type NotificationForm = z.infer<typeof formSchema>

export function SettingsNotifications() {
  const customModeRef = useRef(null)

  const { settings, updateSettings } = useSettingsContext()

  const form = useForm<NotificationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: settings.notifications.mode,
      permissions: settings.notifications.permissions
    }
  })

  const {
    formState: { isDirty },
    reset,
    handleSubmit,
    control,
    watch
  } = form

  const mode = watch('mode')

  const onSubmit = useCallback(
    (notifications: NotificationForm) => {
      updateSettings({
        notifications
      })

      reset(notifications)
    },
    [updateSettings, reset]
  )

  return (
    <AccordionItem value="notification">
      <AccordionTrigger>Notificações</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="mode"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-semibold flex items-center gap-2">
                    Modo de notificação
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={20} />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px]" side="right">
                          <p>
                            No modo <b>Navegador</b>, ao finalizar uma etapa do pomodoro a
                            notificação será exibida pelo navegador, para isso é <b>necessário</b>{' '}
                            habilitar nas permissões de seu navegador. No modo <b>Personalizado</b>{' '}
                            você pode configurar do jeito que achar melhor!
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => {
                        if (value === NotificationsModeEnum.BROWSER && 'Notification' in window)
                          Notification.requestPermission()

                        onChange(value)
                      }}
                      value={value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={NotificationsModeEnum.BROWSER} />
                        </FormControl>
                        <FormLabel className="font-normal">Navegador</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={NotificationsModeEnum.CUSTOM} />
                        </FormControl>
                        <FormLabel className="font-normal">Personalizado</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Fade in={true} timeout={300} unmountOnExit nodeRef={customModeRef}>
              <div ref={customModeRef} className="flex flex-col gap-4">
                <FormField
                  control={control}
                  name="permissions.sound"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Habilitar efeito sonoro</FormLabel>
                        <FormDescription>
                          Seja notificado por um efeito sonoro ao finalizar o pomodoro.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={value}
                          onCheckedChange={onChange}
                          disabled={mode !== NotificationsModeEnum.CUSTOM}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="permissions.toast"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Habilitar pop-up</FormLabel>
                        <FormDescription>
                          Seja notificado por um pop-up na tela ao finalizar o pomodoro.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={value}
                          onCheckedChange={onChange}
                          disabled={mode !== NotificationsModeEnum.CUSTOM}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Fade>

            <FormActions isVisible={isDirty} onDiscard={() => reset()} />
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  )
}
