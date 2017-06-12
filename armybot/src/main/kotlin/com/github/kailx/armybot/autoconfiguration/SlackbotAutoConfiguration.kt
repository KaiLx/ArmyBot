package com.github.kailx.armybot.autoconfiguration

import com.github.kailx.armybot.config.SlackbotProperties
import me.ramswaroop.jbot.core.slack.Bot
import me.ramswaroop.jbot.core.slack.SlackDao
import me.ramswaroop.jbot.core.slack.SlackService
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

/**
 * @author KaiLx
 */
@Configuration
@EnableAutoConfiguration
@ConditionalOnProperty(prefix = "application.slack", name = arrayOf("enable"), havingValue = "true")
class SlackbotAutoConfiguration {

    @Bean
    fun slackService(): SlackService = SlackService()

    @Bean
    fun slackDao(): SlackDao = SlackDao()

    @Bean
    fun slackbot(slackbotProperties: SlackbotProperties): Bot = SlackBot(slackbotProperties)

    class SlackBot(val slackbotProperties: SlackbotProperties) : Bot() {
        override fun getSlackBot(): Bot = this
        override fun getSlackToken(): String = slackbotProperties.token
    }
}