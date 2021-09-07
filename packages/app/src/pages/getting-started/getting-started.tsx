import type { FC } from 'react'
import { Typography, Button } from 'antd'
import { PushpinOutlined } from '@ant-design/icons'

import { RouteComponentProps, navigate, useModelEffect } from '@/ability'
import { usePersistFn } from '@/hooks'
import { Highlight } from '@/components'

import styles from './getting-started.module.less'

const GettingStarted: FC<RouteComponentProps> = () => {
  const { data, loading } = useModelEffect((dispatch) => dispatch.project.get)

  const handleCreateProject = usePersistFn(() => {
    navigate('create-project')
  })

  if (data) {
    return (
      <div className={styles.root}>
        <div>
          <Typography.Title level={2}>接入 Ohbug SDK</Typography.Title>

          <Highlight
            code={`npm install @ohbug/browser --save
# or
yarn add @ohbug/browser`}
          />

          <Typography.Text>
            紧接着在应用初始化的时候加载{' '}
            <Typography.Text code>Ohbug Browser SDK</Typography.Text>：
          </Typography.Text>

          <Highlight
            language="javascript"
            code={`import Ohbug from '@ohbug/browser'

Ohbug.init({ apiKey: '${data?.apiKey}' })`}
          />

          <Button type="link" size="large" href="/issue">
            进入问题列表
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Typography className={styles.tips}>
        点击开始 创建你的 Ohbug 专属服务
      </Typography>

      <Button
        type="primary"
        size="large"
        icon={<PushpinOutlined />}
        loading={loading}
        onClick={handleCreateProject}
      >
        开始
      </Button>
    </div>
  )
}

export default GettingStarted
