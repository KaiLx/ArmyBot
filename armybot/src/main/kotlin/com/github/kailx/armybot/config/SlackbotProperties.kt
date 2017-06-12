package com.github.kailx.armybot.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * @author KaiLx
 */
@Configuration
@ConfigurationProperties(prefix = "application.slack")
class SlackbotProperties {
    var enable = false
    lateinit var token: String
}