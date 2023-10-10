import {connectField, EditingProvider} from '@atsnek/jaen'
import React, {useEffect} from 'react'

import {Preview} from './components/Preview.js'
import {BaseEditorProps, MdastRoot} from './components/types.js'

import {Image, Link} from './default-components.js'
import {defaultData} from './default-data.js'

type MdxFieldValue = MdastRoot

export interface MdxFieldProps {
  components: BaseEditorProps['components']
}

export const MdxField = connectField<MdxFieldValue, MdxFieldProps>(
  ({jaenField, components}) => {
    const [rawValue, setRawValue] = React.useState<MdastRoot | undefined>(
      jaenField.staticValue || defaultData
    )

    useEffect(() => {
      setRawValue(jaenField.value || jaenField.staticValue || defaultData)
    }, [jaenField.value])

    components = {
      ...components,
      img: (props: any) => {
        const src = props.src
        const alt = props.alt

        const name = `${src}-${alt}`

        return <Image name={name} defaultValue={src} alt={alt} />
      },

      Image,
      a: (props: any) => {
        return <Link to={props.href}>{props.children}</Link>
      },
      Link
    }

    if (jaenField.isEditing) {
      // Render editor in edit mode

      return (
        <LayzEditor
          components={components}
          onUpdateValue={jaenField.onUpdateValue}
          rawValue={rawValue}
        />
      )
    } else {
      return <Preview components={components} mdast={rawValue} />
    }
  },
  {
    fieldType: 'IMA:MdxField'
  }
)

export const UncontrolledMdxField: React.FC<{
  components: BaseEditorProps['components']
  onUpdateValue: (value: MdastRoot) => void
  value?: MdastRoot
  isEditing?: boolean
}> = ({components, onUpdateValue, value, isEditing}) => {
  if (isEditing) {
    // Render editor in edit mode

    return (
      <EditingProvider isEditing={isEditing}>
        <LayzEditor
          components={components}
          onUpdateValue={onUpdateValue}
          rawValue={value}
        />
      </EditingProvider>
    )
  } else {
    return <Preview components={components} mdast={value} />
  }
}

const LayzEditor: React.FC<{
  components: BaseEditorProps['components']
  onUpdateValue: (value: MdastRoot) => void
  rawValue?: MdastRoot
}> = ({components, onUpdateValue, rawValue}) => {
  const Editor = React.lazy(async () => await import('./components/Editor.js'))

  const MemoedEditor = React.useMemo(() => Editor, [])

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoedEditor
        components={components}
        onUpdateValue={onUpdateValue}
        mode="editAndPreview"
        mdast={rawValue}></MemoedEditor>
    </React.Suspense>
  )
}
